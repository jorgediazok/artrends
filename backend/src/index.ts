import fastify from "fastify";
import gracefullShutdown from "fastify-graceful-shutdown";

// Utils
import { logger } from "utils/logger";

const app = fastify({ logger: true });

/* Routes */
app.get("/", async () => {
	return "hola!";
});

/* Plugins */
app.register(gracefullShutdown);

app.after(() => {
	app.gracefulShutdown((signal, next) => {
		logger.error(signal.toString());
		next();
	});
});

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
