import { vi } from "vitest";
import type { Db } from "mongodb";

/**
 * Builds a fake Mongo `Db` whose `collection(name).find().limit().sort().toArray()`
 * chain resolves to `result`, or rejects with `result` when `shouldReject` is true.
 * Matches the only query shape used by the trend services.
 */
export function createMockDb(
	result: unknown,
	{ shouldReject = false }: { shouldReject?: boolean } = {}
): Db {
	const toArray = shouldReject
		? vi.fn().mockRejectedValue(result)
		: vi.fn().mockResolvedValue(result);

	const cursor = {
		limit: vi.fn().mockReturnThis(),
		sort: vi.fn().mockReturnThis(),
		toArray,
	};

	const collection = vi.fn().mockReturnValue({
		find: vi.fn().mockReturnValue(cursor),
	});

	return { collection } as unknown as Db;
}

/**
 * Builds a fake Mongo `Db` where each collection name resolves to its own
 * `toArray()` result, for services (like portals) that query several
 * collections from a single `Db` instance.
 */
export function createMockDbForCollections(
	resultsByCollection: Record<string, unknown[]>
): Db {
	const collection = vi.fn().mockImplementation((name: string) => {
		const result = resultsByCollection[name] ?? [];
		return {
			find: vi.fn().mockReturnValue({
				limit: vi.fn().mockReturnThis(),
				sort: vi.fn().mockReturnThis(),
				toArray: vi.fn().mockResolvedValue(result),
			}),
		};
	});

	return { collection } as unknown as Db;
}
