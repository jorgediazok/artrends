import { describe, expect, it } from "vitest";
import portalRoutes from "./portals.routes";
import { buildTestApp } from "../../test/helpers/testApp";
import { fakeCacheError, fakeCacheHit, fakeCacheMiss } from "../../test/helpers/cache";
import { createMockDbForCollections } from "../../test/mocks/mongo";

const current = { _id: "2", record: { date: "2026-08-31", trends: [] } };
const previous = { _id: "1", record: { date: "2026-08-30", trends: [] } };

describe("GET /api/portals", () => {
	it("returns the cached payload when the cache has one", async () => {
		const cachedItem = { current: { clarin: current }, previous: {} };
		const app = buildTestApp(fakeCacheHit(cachedItem));
		portalRoutes(app, createMockDbForCollections({}));

		const response = await app.inject({ method: "GET", url: "/api/portals" });

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({ ...cachedItem, fromCache: true });
	});

	it("queries Mongo and fills the cache on a cache miss", async () => {
		const cache = fakeCacheMiss();
		const app = buildTestApp(cache);
		const db = createMockDbForCollections({
			"portal.clarin": [current, previous],
		});
		portalRoutes(app, db);

		const response = await app.inject({ method: "GET", url: "/api/portals" });

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({
			current: { clarin: current },
			previous: { clarin: previous },
			fromCache: false,
		});
		// the fresh result must be written back so the next request is a hit
		expect(cache.set).toHaveBeenCalledWith(
			"portal-trends",
			{ current: { clarin: current }, previous: { clarin: previous } },
			360000,
			expect.any(Function)
		);
	});

	it("returns a 500 when the cache backend errors", async () => {
		const app = buildTestApp(fakeCacheError(new Error("redis is down")));
		portalRoutes(app, createMockDbForCollections({}));

		const response = await app.inject({ method: "GET", url: "/api/portals" });

		expect(response.statusCode).toBe(500);
	});
});
