import fastifyCaching from "@fastify/caching";
import fastifyRedis from "@fastify/redis";
import IORedis from "ioredis";
import abstractCache from "abstract-cache";
import fastifyPlugin from "fastify-plugin";

/* Environment Variables */
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_TLS } from "../config";

const redis = new IORedis({
	host: REDIS_HOST,
	port: REDIS_PORT,
	password: REDIS_PASSWORD,
	...(REDIS_TLS ? { tls: {} } : {}),
});

// Without a listener, an unhandled 'error' event (e.g. Redis unreachable)
// crashes the whole process. Caching is a nice-to-have, not something a
// missing/misconfigured Redis should be able to take the API down over.
redis.on("error", err => {
	console.error("[redis] connection error:", err.message);
});

const cache = abstractCache({
	useAwait: false,
	driver: {
		name: "abstract-cache-redis",
		options: { client: redis },
	},
});

export default fastifyPlugin(
	app => {
		return app
			.register(fastifyRedis, { client: redis })
			.register(fastifyCaching, {
				cache,
				privacy: fastifyCaching.privacy.PUBLIC,
			});
	},
	{
		name: "cache",
	}
);
