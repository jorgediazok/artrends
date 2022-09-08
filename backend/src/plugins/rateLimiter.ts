import fastifyPlugin from "fastify-plugin";
import fastifyRateLimitPlugin from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";

async function rateLimiter(app: FastifyInstance) {
	await app.register(fastifyRateLimitPlugin, {
		skipOnError: true,
		timeWindow: "1 minute",
		max: 50,
	});
}

export default fastifyPlugin(rateLimiter, {
	name: "rateLimiter",
});
