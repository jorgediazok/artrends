import { describe, expect, it } from "vitest";
import { getTwitterTrends } from "./twitter.service";
import { createMockDb } from "../../test/mocks/mongo";

const current = { _id: "2", record: { date: "2026-08-31", trends: [] } };
const previous = { _id: "1", record: { date: "2026-08-30", trends: [] } };

describe("getTwitterTrends", () => {
	it("returns current and previous when two records exist", async () => {
		const db = createMockDb([current, previous]);

		await expect(getTwitterTrends(db)).resolves.toEqual({
			current,
			previous,
		});
	});

	it("returns only current when a single record exists", async () => {
		const db = createMockDb([current]);

		await expect(getTwitterTrends(db)).resolves.toEqual({
			current,
		});
	});

	it("returns an empty current list when there are no records", async () => {
		const db = createMockDb([]);

		await expect(getTwitterTrends(db)).resolves.toEqual({ current: undefined });
	});

	it("returns the error instead of throwing when the query fails", async () => {
		const error = new Error("connection lost");
		const db = createMockDb(error, { shouldReject: true });

		await expect(getTwitterTrends(db)).resolves.toEqual({ e: error });
	});
});
