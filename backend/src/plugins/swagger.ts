import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyPlugin from "fastify-plugin";

/* Environment variables */
// import { NODE_ENV } from "../config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function swagger(app: any) {
	await app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "Artrends API Documentation",
				description: "Documentación de los endpoints de Artrends Backend",
				version: "1.0",
			},
			tags: [
				{ name: "Google" },
				{ name: "Twitter" },
				{ name: "Youtube" },
			],
		},
	});

	await app.register(fastifySwaggerUi, {
		routePrefix: "/docs",
	});
}

export default fastifyPlugin(swagger, {
	name: "swagger",
});
