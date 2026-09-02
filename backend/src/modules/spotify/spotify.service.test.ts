import { describe, expect, it } from "vitest";
import {
	getArtistTrends,
	getPodcastsTrends,
	getSongsTrends,
} from "./spotify.service";
import { createMockDb } from "../../test/mocks/mongo";

const current = { _id: "2", record: { date: "2026-08-31", trends: [] } };
const previous = { _id: "1", record: { date: "2026-08-30", trends: [] } };

describe.each([
	["getArtistTrends", getArtistTrends],
	["getSongsTrends", getSongsTrends],
	["getPodcastsTrends", getPodcastsTrends],
])("%s", (_name, fn) => {
	it("returns current and previous when two records exist", async () => {
		const db = createMockDb([current, previous]);

		await expect(fn(db)).resolves.toEqual({ current, previous });
	});

	it("returns only current when a single record exists", async () => {
		const db = createMockDb([current]);

		await expect(fn(db)).resolves.toEqual({ current });
	});

	it("returns null when there are no records, unlike the other trend services", async () => {
		const db = createMockDb([]);

		await expect(fn(db)).resolves.toBeNull();
	});

	it("returns the error instead of throwing when the query fails", async () => {
		const error = new Error("connection lost");
		const db = createMockDb(error, { shouldReject: true });

		await expect(fn(db)).resolves.toEqual({ e: error });
	});
});
