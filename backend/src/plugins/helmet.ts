import fastifyPlugin from "fastify-plugin";
import { fastifyHelmet } from "@fastify/helmet";

async function helmet(app: AppInstance) {
	await app.register(fastifyHelmet, {
		contentSecurityPolicy: {
			directives: {
				defaultSrc: [`'self'`],
				styleSrc: [`'self'`, `'unsafe-inline'`, "fonts.googleapis.com"],
				fontSrc: [`'self'`],
				imgSrc: [`'self'`, "data:"],
				scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
			},
			useDefaults: process.env.NODE_ENV !== "production",
		},
	});
}

export default fastifyPlugin(helmet, {
	name: "helmet",
});
