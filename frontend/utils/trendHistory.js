// Turns a /api/.../history response's snapshots (newest-first, as stored)
// into oldest->newest points for one specific trend, matched by `field`
// (e.g. "title" for X/Google/Youtube, "name" for Spotify, "article" for
// portals). `position` is the 1-indexed rank in that snapshot, or null when
// the trend wasn't in that snapshot's top N at all.
export function buildPositionHistory(history, matchValue, field = "title") {
  if (!history || !history.length || !matchValue) return [];

  const chronological = [...history].reverse();

  return chronological.map(snapshot => {
    const items = snapshot?.record?.trends || [];
    const index = items.findIndex(item => item?.[field] === matchValue);

    return {
      date: snapshot?.record?.date ?? null,
      position: index === -1 ? null : index + 1,
    };
  });
}

// Maps buildPositionHistory's output to an SVG polyline "points" string,
// scaled to the observed min/max rank in this series (not a fixed 1-10
// domain, since sources differ in how many trends they track). Snapshots
// where the trend wasn't present (position: null) are dropped BEFORE
// spacing the x-axis, not just skipped in place - a trend that only
// entered the chart in the last few snapshots would otherwise render as
// a short line stranded in one corner with the rest of the chart empty.
export function buildSparklinePoints(
  points,
  { width = 258, height = 52, padding = 6 } = {}
) {
  const baseline = height - padding;

  const known = (points || []).filter(p => p.position != null);
  if (known.length < 2) {
    return { svgPoints: "", areaPoints: "", lastY: height / 2, baseline };
  }

  const positions = known.map(p => p.position);
  const min = Math.min(...positions);
  const max = Math.max(...positions);
  const range = max - min || 1;

  const usableW = width - padding * 2;
  const usableH = height - padding * 2;
  const lastIndex = known.length - 1;

  const coords = known.map((p, i) => {
    const x = padding + (i / lastIndex) * usableW;
    // A lower position number is a better rank; map it near the top
    // (small y) and worse ranks toward the bottom (large y).
    const y = padding + ((p.position - min) / range) * usableH;
    return { x, y };
  });

  const svgPoints = coords
    .map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(" ");

  // The same points, closed down to the baseline at both ends - fills an
  // area-under-the-line shape (with a gradient) instead of a bare line
  // floating with no visual anchor.
  const areaPoints = `${padding},${baseline} ${svgPoints} ${(
    width - padding
  ).toFixed(1)},${baseline}`;

  return {
    svgPoints,
    areaPoints,
    lastY: coords[coords.length - 1].y,
    baseline,
  };
}

// The last `count` snapshots where the trend actually had a position -
// what the popover's timeline row shows. Dropping the null (not-present)
// snapshots here too means the row never pads itself with a blank "—"
// entry that has no date under it.
export function pickTimelinePoints(points, count = 4) {
  return (points || []).filter(p => p.position != null).slice(-count);
}

// Buckets a trend's real (non-null) points into what the popover actually
// has to say about it:
// - "new": this is the first time we've seen it - a chart can't show
//   history that doesn't exist yet.
// - "stable": present in 2+ snapshots, same rank every time - a flat
//   line technically isn't wrong, but "steady at #1 since [real elapsed
//   time]" says the same thing without looking like a rendering glitch.
// - "moved": rank actually changed - this is the one case a sparkline
//   earns its place.
// Sources scrape at wildly different real-world cadences (X hourly,
// YouTube's chart is closer to daily even though we poll it every 2h,
// Spotify weekly) - `sinceDate` is the oldest snapshot in the stable
// run, in wall-clock time, so the caller can phrase "hace X" in
// whatever unit actually fits (minutes/hours/days/weeks) instead of a
// scrape count that means a completely different amount of real time
// per source.
export function classifyTrendHistory(points) {
  const known = (points || []).filter(p => p.position != null);

  if (known.length <= 1) {
    return { status: "new" };
  }

  const allSamePosition = known.every(p => p.position === known[0].position);
  if (allSamePosition) {
    return {
      status: "stable",
      position: known[0].position,
      sinceDate: known[0].date,
    };
  }

  return { status: "moved" };
}

// "hace 3 días" / "hace 2 semanas" - phrased in whatever unit the actual
// elapsed time calls for, so the same wording works whether the source
// behind it scrapes hourly or weekly. `now` is injectable for tests.
export function formatElapsedTime(fromIso, now = new Date()) {
  if (!fromIso) return "";
  const from = new Date(fromIso);
  if (Number.isNaN(from.getTime())) return "";

  const minutes = Math.max(
    0,
    Math.round((now.getTime() - from.getTime()) / 60000)
  );

  if (minutes < 60) {
    return minutes <= 1 ? "hace 1 minuto" : `hace ${minutes} minutos`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? "hace 1 hora" : `hace ${hours} horas`;
  }

  const days = Math.round(hours / 24);
  if (days < 7) {
    return days === 1 ? "hace 1 día" : `hace ${days} días`;
  }

  const weeks = Math.round(days / 7);
  return weeks === 1 ? "hace 1 semana" : `hace ${weeks} semanas`;
}

// Sources scrape at very different cadences (X hourly, Spotify weekly).
// Showing only a clock time on every source makes a weekly point look
// like it happened "an hour ago" - two different weeks can land on the
// same hour:minute. Fall back to a date once the points being compared
// don't all share a calendar day.
export function areSameCalendarDay(points) {
  const dates = (points || [])
    .map(p => p?.date)
    .filter(Boolean)
    .map(d => new Date(d).toDateString());

  return dates.length > 0 && dates.every(d => d === dates[0]);
}
