import Fastify from "fastify";
import type { AppInstance } from "../../types/appInstance";
import type { FakeCache } from "./cache";

/**
 * A bare Fastify instance with a fake `cache` decorator, standing in for
 * the real app from src/index.ts (which also wires up Redis, Discord, rate
 * limiting, etc. — none of which a route test needs).
 */
export function buildTestApp(cache: FakeCache): AppInstance {
	const app = Fastify();
	app.decorate("cache", cache);
	return app as unknown as AppInstance;
}
