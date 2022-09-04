const fastify = require("fastify")({ logger: true });

fastify.get("/", async (request, reply) => {
	return "hola!";
});

// Run the server!
const start = async () => {
	try {
		await fastify.listen({ host: "0.0.0.0", port: 3000 });
		console.log("API started!");
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
