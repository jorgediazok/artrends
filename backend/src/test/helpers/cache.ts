import { vi } from "vitest";

/**
 * Fakes for `app.cache`, the decorator @fastify/caching adds to the Fastify
 * instance. Routes always call it as `cache.get(key, callback)` /
 * `cache.set(key, value, ttl, callback)` — these helpers give each test a
 * cache that behaves like a hit, a miss, or a broken connection, without
 * needing a real Redis instance.
 */

type CacheResult = { item: unknown; stored: number; ttl: number } | null;
type GetCallback = (error: unknown, result: CacheResult) => void;
type SetCallback = (error: unknown) => void;

export function fakeCacheHit(item: unknown) {
	return {
		get: vi.fn((_key: string, cb: GetCallback) =>
			cb(null, { item, stored: Date.now(), ttl: 360000 })
		),
		set: vi.fn(
			(_key: string, _value: unknown, _ttl: number, cb?: SetCallback) =>
				cb?.(null)
		),
	};
}

export function fakeCacheMiss() {
	return {
		get: vi.fn((_key: string, cb: GetCallback) => cb(null, null)),
		set: vi.fn(
			(_key: string, _value: unknown, _ttl: number, cb?: SetCallback) =>
				cb?.(null)
		),
	};
}

export function fakeCacheError(error: unknown) {
	return {
		get: vi.fn((_key: string, cb: GetCallback) => cb(error, null)),
		set: vi.fn(
			(_key: string, _value: unknown, _ttl: number, cb?: SetCallback) =>
				cb?.(null)
		),
	};
}

export type FakeCache = ReturnType<typeof fakeCacheMiss>;
