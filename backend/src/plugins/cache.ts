import fastifyCaching from "@fastify/caching";
import fastifyRedis from "@fastify/redis";
import IORedis from "ioredis";
import abstractCache from "abstract-cache";
import fastifyPlugin from "fastify-plugin";

/* Environment Variables */
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../config";

const redis = new IORedis({
	host: REDIS_HOST,
	port: REDIS_PORT,
	password: REDIS_PASSWORD,
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
