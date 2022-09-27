import fastify from "fastify";

import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

/* Routes */
import googleRoutes from "./modules/google";
import twitterRoutes from "./modules/twitter";

/* Plugins */
import rateLimiter from "./plugins/rateLimiter";
import helmet from "./plugins/helmet";
import swagger from "./plugins/swagger";
import cache from "./plugins/cache";

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
	}).withTypeProvider<TypeBoxTypeProvider>();

	/* Register Plugins */
	await app.register(rateLimiter);
	await app.register(helmet);
	await app.register(swagger);
	await app.register(cache);

	/* Register Routes */
	googleRoutes(app);
	twitterRoutes(app);

	process.on("uncaughtException", error => {
		app.log.error("uncaughtException:", error);
		process.exit(1);
	});

	process.on("unhandledRejection", error => {
		app.log.error("unhandledRejection:", error);
		process.exit(1);
	});

	await app
		.listen({ host: "0.0.0.0", port: parseInt(process.env.PORT || "3500") })
		.catch(err => {
			app.log.error(err);
			process.exit(1);
		});

	app.log.info("Backend started succesfully");
}

bootstrap();
