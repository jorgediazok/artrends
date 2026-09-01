import { describe, expect, it } from "vitest";
import { getPosition } from "./position";

describe("getPosition", () => {
	it("returns 'up' for a brand new entry (no previous position)", () => {
		expect(getPosition(0, -1)).toBe("up");
	});

	it("returns 'down' when the item moved to a worse rank", () => {
		expect(getPosition(5, 2)).toBe("down");
	});

	it("returns 'same' when the rank didn't change", () => {
		expect(getPosition(2, 2)).toBe("same");
	});

	it("returns 'up' when the item moved to a better rank", () => {
		expect(getPosition(1, 4)).toBe("up");
	});
});
