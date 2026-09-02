import { describe, expect, it } from "vitest";
import { calculateLines } from "./calculateLines";

describe("calculateLines", () => {
	it.each([
		["buscado", "one-max-line"],
		["discutido", "one-max-line"],
		["escuchado", "one-max-line"],
		["visto", "two-max-lines"],
		["leido", "four-max-lines"],
	])("maps %s to %s", (type, expected) => {
		expect(calculateLines(type)).toBe(expected);
	});

	it("falls back to three-max-lines for an unknown type", () => {
		expect(calculateLines("unknown")).toBe("three-max-lines");
		expect(calculateLines(undefined)).toBe("three-max-lines");
	});
});
