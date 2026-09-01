const normalize = text =>
  (text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

const extractSourceGroups = trends => {
  const groups = [];

  const pushGroup = (label, items) => {
    if (items && items.length) groups.push({ label, items });
  };

  pushGroup(
    "X",
    trends?.twitter?.current?.record?.trends?.map(t => t.title)
  );
  pushGroup(
    "Google",
    trends?.google?.current?.record?.trends?.map(t => t.title)
  );
  pushGroup(
    "YouTube",
    trends?.youtube?.current?.record?.trends?.map(t => t.title)
  );
  pushGroup(
    "Spotify",
    trends?.spotifySongs?.current?.record?.trends?.map(t => t.name)
  );
  pushGroup(
    "Spotify",
    trends?.spotifyArtists?.current?.record?.trends?.map(t => t.name)
  );

  ["elDestape", "clarin", "infobae", "laNacion", "tn"].forEach(outlet => {
    pushGroup(
      "Portales",
      trends?.portals?.current?.[outlet]?.record?.trends?.map(t => t.article)
    );
  });

  return groups;
};

// Returns { [normalizedTitle]: string[] } for every title that shows up
// (after normalizing case/accents/whitespace) in 2+ of the sources above.
export function findCrossPlatformMatches(trends) {
  const groups = extractSourceGroups(trends);
  const labelsByKey = {};

  groups.forEach(({ label, items }) => {
    items.filter(Boolean).forEach(rawTitle => {
      const key = normalize(rawTitle);
      if (!key) return;
      if (!labelsByKey[key]) labelsByKey[key] = new Set();
      labelsByKey[key].add(label);
    });
  });

  const matches = {};
  Object.entries(labelsByKey).forEach(([key, labelSet]) => {
    if (labelSet.size > 1) {
      matches[key] = Array.from(labelSet);
    }
  });

  return matches;
}

// "Tendencia también en Google y YouTube" for a given trend title,
// excluding the source it's already being rendered in. Returns null when
// there's no match.
export function getCrossPlatformLabel(matches, title, currentSourceLabel) {
  const labels = matches?.[normalize(title)];
  if (!labels) return null;

  const others = labels.filter(label => label !== currentSourceLabel);
  if (!others.length) return null;

  return `Tendencia también en ${others.join(" y ")}`;
}
