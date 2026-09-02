import { describe, expect, it } from "vitest";
import {
  areSameCalendarDay,
  buildPositionHistory,
  buildSparklinePoints,
  classifyTrendHistory,
  formatElapsedTime,
  pickTimelinePoints,
} from "./trendHistory";

const snapshot = (date, titles) => ({
  record: { date, trends: titles.map(title => ({ title })) },
});

describe("buildPositionHistory", () => {
  it("returns oldest-to-newest points with 1-indexed positions", () => {
    const history = [
      snapshot("2026-09-01T15:00:00Z", ["Messi", "otro"]),
      snapshot("2026-09-01T14:00:00Z", ["otro", "Messi"]),
    ];

    expect(buildPositionHistory(history, "Messi")).toEqual([
      { date: "2026-09-01T14:00:00Z", position: 2 },
      { date: "2026-09-01T15:00:00Z", position: 1 },
    ]);
  });

  it("uses null when the trend isn't present in a given snapshot", () => {
    const history = [snapshot("2026-09-01T15:00:00Z", ["otro"])];

    expect(buildPositionHistory(history, "Messi")).toEqual([
      { date: "2026-09-01T15:00:00Z", position: null },
    ]);
  });

  it("matches against a custom field, e.g. Spotify's 'name'", () => {
    const history = [
      { record: { date: "d1", trends: [{ name: "Quevedo" }] } },
    ];

    expect(buildPositionHistory(history, "Quevedo", "name")).toEqual([
      { date: "d1", position: 1 },
    ]);
  });

  it("returns an empty array for missing history or match value", () => {
    expect(buildPositionHistory(undefined, "Messi")).toEqual([]);
    expect(buildPositionHistory([], "Messi")).toEqual([]);
    expect(buildPositionHistory([snapshot("d1", ["Messi"])], null)).toEqual(
      []
    );
  });
});

describe("buildSparklinePoints", () => {
  it("maps a better (lower) position to a smaller y than a worse one", () => {
    const { svgPoints } = buildSparklinePoints(
      [{ position: 1 }, { position: 5 }],
      { width: 100, height: 50, padding: 0 }
    );

    const [[, y1], [, y2]] = svgPoints
      .split(" ")
      .map(pair => pair.split(",").map(Number));

    expect(y1).toBeLessThan(y2);
  });

  it("skips snapshots where the trend was absent (null position)", () => {
    const { svgPoints } = buildSparklinePoints([
      { position: 1 },
      { position: null },
      { position: 3 },
    ]);

    expect(svgPoints.split(" ")).toHaveLength(2);
  });

  it("returns an empty polyline when fewer than 2 points are known", () => {
    expect(buildSparklinePoints([{ position: 1 }]).svgPoints).toBe("");
    expect(buildSparklinePoints([]).svgPoints).toBe("");
  });

  it("spreads known points evenly even when most snapshots are null (no stranded corner line)", () => {
    // A trend that only entered the top 10 in the last 2 of 10 snapshots.
    const points = Array.from({ length: 8 }, () => ({ position: null })).concat([
      { position: 5 },
      { position: 1 },
    ]);

    const { svgPoints } = buildSparklinePoints(points, {
      width: 100,
      height: 50,
      padding: 0,
    });
    const [[x1], [x2]] = svgPoints
      .split(" ")
      .map(pair => pair.split(",").map(Number));

    // With only 2 known points spread across the full width, they should
    // land at the two ends (0 and 100), not compressed into one corner.
    expect(x1).toBe(0);
    expect(x2).toBe(100);
  });

  it("closes the area shape down to the baseline at both ends", () => {
    const { areaPoints, baseline } = buildSparklinePoints(
      [{ position: 1 }, { position: 5 }],
      { width: 100, height: 50, padding: 5 }
    );

    expect(baseline).toBe(45);
    expect(areaPoints.startsWith("5,45 ")).toBe(true);
    expect(areaPoints.endsWith(" 95.0,45")).toBe(true);
  });
});

describe("pickTimelinePoints", () => {
  it("drops snapshots where the trend was absent", () => {
    const points = [
      { date: "d1", position: null },
      { date: "d2", position: 3 },
      { date: "d3", position: 1 },
    ];

    expect(pickTimelinePoints(points, 4)).toEqual([
      { date: "d2", position: 3 },
      { date: "d3", position: 1 },
    ]);
  });

  it("keeps only the last N known points", () => {
    const points = [
      { date: "d1", position: 5 },
      { date: "d2", position: 4 },
      { date: "d3", position: 3 },
      { date: "d4", position: 2 },
      { date: "d5", position: 1 },
    ];

    expect(pickTimelinePoints(points, 2)).toEqual([
      { date: "d4", position: 2 },
      { date: "d5", position: 1 },
    ]);
  });
});

describe("classifyTrendHistory", () => {
  it("is 'new' when the trend has 0 or 1 real appearances", () => {
    expect(classifyTrendHistory([])).toEqual({ status: "new" });
    expect(classifyTrendHistory([{ position: null }])).toEqual({
      status: "new",
    });
    expect(classifyTrendHistory([{ position: 3 }])).toEqual({
      status: "new",
    });
  });

  it("is 'stable' when every real appearance has the same rank, keeping the oldest date", () => {
    const points = [
      { date: "d0", position: null },
      { date: "d1", position: 1 },
      { date: "d2", position: 1 },
      { date: "d3", position: 1 },
    ];
    expect(classifyTrendHistory(points)).toEqual({
      status: "stable",
      position: 1,
      sinceDate: "d1",
    });
  });

  it("is 'moved' when the rank actually changed", () => {
    const points = [{ position: 5 }, { position: 2 }, { position: 1 }];
    expect(classifyTrendHistory(points)).toEqual({ status: "moved" });
  });
});

describe("formatElapsedTime", () => {
  const now = new Date("2026-09-01T18:00:00Z");

  it("phrases minutes for a recent date", () => {
    expect(formatElapsedTime("2026-09-01T17:45:00Z", now)).toBe(
      "hace 15 minutos"
    );
    expect(formatElapsedTime("2026-09-01T17:59:00Z", now)).toBe(
      "hace 1 minuto"
    );
  });

  it("phrases hours once past 60 minutes", () => {
    expect(formatElapsedTime("2026-09-01T15:00:00Z", now)).toBe(
      "hace 3 horas"
    );
    expect(formatElapsedTime("2026-09-01T17:00:00Z", now)).toBe(
      "hace 1 hora"
    );
  });

  it("phrases days once past 24 hours (e.g. YouTube's real cadence)", () => {
    expect(formatElapsedTime("2026-08-29T18:00:00Z", now)).toBe(
      "hace 3 días"
    );
  });

  it("phrases weeks once past 7 days (e.g. Spotify's real cadence)", () => {
    expect(formatElapsedTime("2026-08-11T18:00:00Z", now)).toBe(
      "hace 3 semanas"
    );
    expect(formatElapsedTime("2026-08-25T18:00:00Z", now)).toBe(
      "hace 1 semana"
    );
  });

  it("returns an empty string for a missing or invalid date", () => {
    expect(formatElapsedTime(null, now)).toBe("");
    expect(formatElapsedTime("not-a-date", now)).toBe("");
  });
});

describe("areSameCalendarDay", () => {
  it("is true when every point falls on the same day", () => {
    const points = [
      { date: "2026-09-01T10:00:00Z" },
      { date: "2026-09-01T18:00:00Z" },
    ];
    expect(areSameCalendarDay(points)).toBe(true);
  });

  it("is false when points span different days (e.g. a weekly cadence)", () => {
    const points = [
      { date: "2026-08-25T20:40:00Z" },
      { date: "2026-09-01T20:40:00Z" },
    ];
    expect(areSameCalendarDay(points)).toBe(false);
  });

  it("is false for an empty list", () => {
    expect(areSameCalendarDay([])).toBe(false);
  });
});
