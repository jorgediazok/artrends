import fastifySwagger from "@fastify/swagger";
import fastifyPlugin from "fastify-plugin";

/* Environment variables */
import { NODE_ENV } from "../config";

async function swagger(app: AppInstance) {
	await app.register(fastifySwagger, {
		swagger: {
			info: {
				title: "Artrends API Documentation",
				description: "Documentación de los endpoints de Artrends Backend",
				version: "1.0",
			},
			schemes: ["http"],
			consumes: ["application/json"],
			produces: ["application/json"],
			tags: [],
		},
		routePrefix: "/docs",
		mode: "dynamic",
		exposeRoute: NODE_ENV !== "production",
	});
}

export default fastifyPlugin(swagger, {
	name: "swagger",
});
