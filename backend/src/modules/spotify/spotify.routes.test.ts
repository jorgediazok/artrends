import { describe, expect, it } from "vitest";
import spotifyRoutes from "./spotify.routes";
import { buildTestApp } from "../../test/helpers/testApp";
import { fakeCacheError, fakeCacheHit, fakeCacheMiss } from "../../test/helpers/cache";
import { createMockDb } from "../../test/mocks/mongo";

const current = { _id: "2", record: { date: "2026-08-31", trends: [] } };
const previous = { _id: "1", record: { date: "2026-08-30", trends: [] } };

// spotifyRoutes registers all three endpoints on the same app instance,
// so each case just points inject() at the URL/cache key it cares about.
describe.each([
	{ url: "/api/spotify/artist-trends", cacheKey: "spotify/artists-trends" },
	{ url: "/api/spotify/song-trends", cacheKey: "spotify/songs-trends" },
	{ url: "/api/spotify/podcast-trends", cacheKey: "spotify/podcasts-trends" },
])("GET $url", ({ url, cacheKey }) => {
	it("returns the cached payload when the cache has one", async () => {
		const cachedItem = { current, previous };
		const app = buildTestApp(fakeCacheHit(cachedItem));
		spotifyRoutes(app, createMockDb([]));

		const response = await app.inject({ method: "GET", url });

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({ ...cachedItem, fromCache: true });
	});

	it("returns null current when the cache is empty (Spotify's no-data marker)", async () => {
		const app = buildTestApp(fakeCacheHit(null));
		spotifyRoutes(app, createMockDb([]));

		const response = await app.inject({ method: "GET", url });

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({ current: null, fromCache: true });
	});

	it("queries Mongo and fills the cache on a cache miss", async () => {
		const cache = fakeCacheMiss();
		const app = buildTestApp(cache);
		const db = createMockDb([current, previous]);
		spotifyRoutes(app, db);

		const response = await app.inject({ method: "GET", url });

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({ current, previous, fromCache: false });
		expect(cache.set).toHaveBeenCalledWith(
			cacheKey,
			{ current, previous },
			360000,
			expect.any(Function)
		);
	});

	it("returns null current when Mongo has no records for it either", async () => {
		const app = buildTestApp(fakeCacheMiss());
		spotifyRoutes(app, createMockDb([]));

		const response = await app.inject({ method: "GET", url });

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({ current: null, fromCache: false });
	});

	it("returns a 500 when the Mongo query itself fails", async () => {
		const app = buildTestApp(fakeCacheMiss());
		const db = createMockDb(new Error("connection lost"), {
			shouldReject: true,
		});
		spotifyRoutes(app, db);

		const response = await app.inject({ method: "GET", url });

		expect(response.statusCode).toBe(500);
	});

	it("returns a 500 when the cache backend errors", async () => {
		const app = buildTestApp(fakeCacheError(new Error("redis is down")));
		spotifyRoutes(app, createMockDb([]));

		const response = await app.inject({ method: "GET", url });

		expect(response.statusCode).toBe(500);
	});
});
