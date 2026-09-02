import { describe, expect, it } from "vitest";
import youtubeRoutes from "./youtube.routes";
import { buildTestApp } from "../../test/helpers/testApp";
import { fakeCacheError, fakeCacheHit, fakeCacheMiss } from "../../test/helpers/cache";
import { createMockDb } from "../../test/mocks/mongo";

const current = { _id: "2", record: { date: "2026-08-31", trends: [] } };
const previous = { _id: "1", record: { date: "2026-08-30", trends: [] } };

describe("GET /api/youtube-trends", () => {
	it("returns the cached payload when the cache has one", async () => {
		const cachedItem = { current, previous };
		const app = buildTestApp(fakeCacheHit(cachedItem));
		youtubeRoutes(app, createMockDb([]));

		const response = await app.inject({
			method: "GET",
			url: "/api/youtube-trends",
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({ ...cachedItem, fromCache: true });
	});

	it("queries Mongo and fills the cache on a cache miss", async () => {
		const cache = fakeCacheMiss();
		const app = buildTestApp(cache);
		const db = createMockDb([current, previous]);
		youtubeRoutes(app, db);

		const response = await app.inject({
			method: "GET",
			url: "/api/youtube-trends",
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({ current, previous, fromCache: false });
		expect(cache.set).toHaveBeenCalledWith(
			"youtube-trends",
			{ current, previous },
			360000,
			expect.any(Function)
		);
	});

	it("returns a 500 when the Mongo query itself fails", async () => {
		const app = buildTestApp(fakeCacheMiss());
		const db = createMockDb(new Error("connection lost"), {
			shouldReject: true,
		});
		youtubeRoutes(app, db);

		const response = await app.inject({
			method: "GET",
			url: "/api/youtube-trends",
		});

		expect(response.statusCode).toBe(500);
	});

	it("returns a 500 when the cache backend errors", async () => {
		const app = buildTestApp(fakeCacheError(new Error("redis is down")));
		youtubeRoutes(app, createMockDb([]));

		const response = await app.inject({
			method: "GET",
			url: "/api/youtube-trends",
		});

		expect(response.statusCode).toBe(500);
	});
});
