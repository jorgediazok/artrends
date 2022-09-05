import fastify from "fastify";

const app = fastify({ logger: true });

app.get("/", async () => {
	return "hola!";
});

// Run the server!
const start = async () => {
	try {
		await app.listen({ host: "0.0.0.0", port: 3000 });
		console.log("API started!");
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();
