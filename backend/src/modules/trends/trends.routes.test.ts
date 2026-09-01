import { describe, expect, it } from "vitest";
import trendsRoutes from "./trends.routes";
import { buildTestApp } from "../../test/helpers/testApp";
import { fakeCacheError, fakeCacheHit, fakeCacheMiss } from "../../test/helpers/cache";
import { createMockDbForCollections } from "../../test/mocks/mongo";

const current = { _id: "2", record: { date: "2026-08-31", trends: [] } };
const previous = { _id: "1", record: { date: "2026-08-30", trends: [] } };

describe("GET /api/trends", () => {
	it("returns the cached payload when the cache has one", async () => {
		const cachedItem = { twitter: { current, previous } };
		const app = buildTestApp(fakeCacheHit(cachedItem));
		trendsRoutes(app, createMockDbForCollections({}));

		const response = await app.inject({ method: "GET", url: "/api/trends" });

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({ ...cachedItem, fromCache: true });
	});

	it("aggregates every service and drops the ones with no data, on a cache miss", async () => {
		const app = buildTestApp(fakeCacheMiss());
		const db = createMockDbForCollections({
			twitter: [current, previous],
			google: [current],
			youtube: [],
			"spotify.artists": [],
			"spotify.songs": [current],
			"spotify.podcasts": [],
		});
		trendsRoutes(app, db);

		const response = await app.inject({ method: "GET", url: "/api/trends" });

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({
			twitter: { current, previous },
			google: { current: [current] },
			youtube: { current: [] },
			spotifySongs: { current: [current] },
			portals: { current: {}, previous: {} },
			fromCache: false,
			// spotifyArtists/spotifyPodcasts are absent: their services
			// return null on an empty collection, and trends.routes.ts
			// only adds a key to the response when the service result is truthy
		});
	});

	it("returns a 500 when the cache backend errors", async () => {
		const app = buildTestApp(fakeCacheError(new Error("redis is down")));
		trendsRoutes(app, createMockDbForCollections({}));

		const response = await app.inject({ method: "GET", url: "/api/trends" });

		expect(response.statusCode).toBe(500);
	});
});
