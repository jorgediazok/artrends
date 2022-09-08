import fastify from "fastify";
import { MongoClient } from "mongodb";

/* Plugins */
import rateLimiter from "./plugins/rateLimiter";
import helmet from "./plugins/helmet";

/* Environment variables */
import { DATABASE_CONNECTION_URI } from "./config";

async function bootstrap() {
	/* Init Fastify */
	const app = fastify({
		logger: {
			transport: {
				options: {
					colorize: true,
				},
				target: "pino-pretty",
			},
		},
	});

	/* Register Plugins */
	await app.register(rateLimiter);
	await app.register(helmet);

	/* Register Routes */
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

	process.on("uncaughtException", error => {
		app.log.error("uncaughtException:", error);
		process.exit(1);
	});

	process.on("unhandledRejection", error => {
		app.log.error("unhandledRejection:", error);
		process.exit(1);
	});

	await app.listen({ host: "0.0.0.0", port: 3000 }).catch(err => {
		app.log.error(err);
		process.exit(1);
	});

	app.log.info("Backend started succesfully");
}

bootstrap();
