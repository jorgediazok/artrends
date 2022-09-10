import fastifySwagger from "@fastify/swagger";
import fastifyPlugin from "fastify-plugin";

/* Environment variables */
import { NODE_ENV } from "../config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function swagger(app: any) {
	await app.register(fastifySwagger, {
		swagger: {
			info: {
				title: "Artrends API Documentation",
				description: "Documentación de los endpoints de Artrends Backend",
				version: "1.0",
			},
			schemes: ["http", "https"],
			consumes: ["application/json"],
			produces: ["application/json"],
			tags: ["Google", "Twitter"],
		},
		routePrefix: "/docs",
		mode: "dynamic",
		exposeRoute: NODE_ENV !== "production",
	});
}

export default fastifyPlugin(swagger, {
	name: "swagger",
});
