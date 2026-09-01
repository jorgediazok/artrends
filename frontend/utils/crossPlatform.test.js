import { describe, expect, it } from "vitest";
import { findCrossPlatformMatches, getCrossPlatformLabel } from "./crossPlatform";

const buildTrends = ({ twitterTitles = [], googleTitles = [] } = {}) => ({
  twitter: {
    current: { record: { trends: twitterTitles.map(title => ({ title })) } },
  },
  google: {
    current: { record: { trends: googleTitles.map(title => ({ title })) } },
  },
});

describe("findCrossPlatformMatches", () => {
  it("matches the same title across sources regardless of case or accents", () => {
    const trends = buildTrends({
      twitterTitles: ["Messi"],
      googleTitles: ["messi"],
    });

    const matches = findCrossPlatformMatches(trends);

    expect(matches["messi"]).toEqual(expect.arrayContaining(["X", "Google"]));
  });

  it("does not include a title that only appears in one source", () => {
    const trends = buildTrends({
      twitterTitles: ["jungkook"],
      googleTitles: ["messi"],
    });

    const matches = findCrossPlatformMatches(trends);

    expect(matches["jungkook"]).toBeUndefined();
    expect(matches["messi"]).toBeUndefined();
  });

  it("returns an empty object when there is no trends data", () => {
    expect(findCrossPlatformMatches(undefined)).toEqual({});
    expect(findCrossPlatformMatches({})).toEqual({});
  });
});

describe("getCrossPlatformLabel", () => {
  it("names the other source(s), excluding the current one", () => {
    const matches = { messi: ["X", "Google"] };

    expect(getCrossPlatformLabel(matches, "Messi", "X")).toBe(
      "Tendencia también en Google"
    );
    expect(getCrossPlatformLabel(matches, "messi", "Google")).toBe(
      "Tendencia también en X"
    );
  });

  it("returns null when the title has no cross-platform match", () => {
    const matches = { messi: ["X", "Google"] };

    expect(getCrossPlatformLabel(matches, "jungkook", "X")).toBeNull();
  });

  it("returns null when the only match is the current source itself", () => {
    const matches = { messi: ["X"] };

    expect(getCrossPlatformLabel(matches, "Messi", "X")).toBeNull();
  });
});
