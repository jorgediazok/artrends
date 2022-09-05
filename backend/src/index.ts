import fastify from "fastify";
import dotenv from "dotenv";

// Utils
import { logger } from "./utils/logger";

/* Environment variables */
dotenv.config();

logger.info(process.env.toString());

/* Init Fastify */
const app = fastify({ logger: true });

/* Routes */
app.get("/", async () => {
	return "hola!";
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

process.on("uncaughtException", error => {
	logger.error("uncaughtException:", error);
	process.exit(1);
});

process.on("unhandledRejection", error => {
	logger.error("unhandledRejection:", error);
	process.exit(1);
});

start();
