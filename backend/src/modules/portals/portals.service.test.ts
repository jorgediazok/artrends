import { describe, expect, it } from "vitest";
import { getPortalTrends } from "./portals.service";
import { createMockDbForCollections } from "../../test/mocks/mongo";

const current = { _id: "2", record: { date: "2026-08-31", trends: [] } };
const previous = { _id: "1", record: { date: "2026-08-30", trends: [] } };

describe("getPortalTrends", () => {
	it("keys current/previous by portal when two records exist", async () => {
		const db = createMockDbForCollections({
			"portal.elDestape": [current, previous],
			"portal.clarin": [current, previous],
			"portal.infobae": [current, previous],
			"portal.laNacion": [current, previous],
			"portal.tn": [current, previous],
		});

		await expect(getPortalTrends(db)).resolves.toEqual({
			current: {
				elDestape: current,
				clarin: current,
				infobae: current,
				laNacion: current,
				tn: current,
			},
			previous: {
				elDestape: previous,
				clarin: previous,
				infobae: previous,
				laNacion: previous,
				tn: previous,
			},
		});
	});

	it("only sets current for a portal with a single record", async () => {
		const db = createMockDbForCollections({
			"portal.elDestape": [current],
		});

		const result = await getPortalTrends(db);

		expect(result.current.elDestape).toEqual(current);
		expect(result.previous.elDestape).toBeUndefined();
	});

	it("omits a portal entirely when it has no records", async () => {
		const db = createMockDbForCollections({});

		await expect(getPortalTrends(db)).resolves.toEqual({
			current: {},
			previous: {},
		});
	});

	it("returns the error instead of throwing when any query fails", async () => {
		const error = new Error("connection lost");
		const db = {
			collection: () => ({
				find: () => ({
					limit: () => ({
						sort: () => ({
							toArray: () => Promise.reject(error),
						}),
					}),
				}),
			}),
		} as never;

		await expect(getPortalTrends(db)).resolves.toEqual({ e: error });
	});
});
