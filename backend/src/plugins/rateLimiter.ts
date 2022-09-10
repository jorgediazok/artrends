import fastifyPlugin from "fastify-plugin";
import fastifyRateLimitPlugin from "@fastify/rate-limit";

async function rateLimiter(app: AppInstance) {
	await app.register(fastifyRateLimitPlugin, {
		skipOnError: true,
		timeWindow: "1 minute",
		max: 50,
	});
}

export default fastifyPlugin(rateLimiter, {
	name: "rateLimiter",
});
