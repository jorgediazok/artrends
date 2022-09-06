import fastify from "fastify";

import { MongoClient } from "mongodb";

// Utils
import { logger } from "./utils/logger";

/* Environment variables */
import { DATABASE_CONNECTION_URI } from "./config";

/* Init Fastify */
const app = fastify({ logger: true });

/* Routes */
app.get("/google-trends", async () => {
	try {
		const client = new MongoClient(DATABASE_CONNECTION_URI);
		const trends = await client
			.db("artrends")
			.collection("google")
			.find()
			.limit(2)
			.toArray();

		if (trends.length === 2) {
			const [current, previous] = trends;
			return {
				current,
				previous,
			};
		}

		return trends;
	} catch (e) {
		app.log.error(e);
		return [];
	}
});

const start = async () => {
	try {
		await app.listen({ host: "0.0.0.0", port: 3000 });

		app.log.info("Backend started succesfully");
	} catch (err) {
		app.log.error(err);

		process.exit(1);
	}
};

process.on("uncaughtException", error => {
	app.log.error("uncaughtException:", error);
	process.exit(1);
});

process.on("unhandledRejection", error => {
	app.log.error("unhandledRejection:", error);
	process.exit(1);
});

start();
