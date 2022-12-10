// Services
import { getPortalTrends } from "./portals.service";

// Schema
import { Type } from "@sinclair/typebox";

// Types
import { FastifyReply, FastifyRequest } from "fastify";
import { AppInstance } from "../../types/appInstance";
import { isCacheResult } from "../../types/cache";

export default function portalRoutes(app: AppInstance) {
	app.get(
		"/api/portals",
		{
			schema: {
				tags: ["Portals"],
				summary: "Trends de portales de noticias",
				response: {
					500: Type.Optional(Type.String()),
				},
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("portal-trends", async (error, cacheHit) => {
				if (error) {
					console.log("Error", error);
					reply.status(500).send(error);
					return;
				}
				if (isCacheResult(cacheHit)) {
					if (cacheHit.stored) {
						if (!cacheHit.item) {
							console.log({ cacheHit });
							return reply.status(200).send({ current: null, fromCache: true });
						} else {
							return reply
								.status(200)
								.send({ ...cacheHit.item, fromCache: true });
						}
					}
				}

				if (!cacheHit) {
					const result = await getPortalTrends();

					if (result?.e) {
						app.log.error(result.e);
						return reply.status(500);
					}

					app.cache.set("portal-trends", result, 360000, err => {
						if (err) {
							console.log({ err });
							return err;
						}

						if (!result) {
							return reply
								.status(200)
								.send({ current: null, fromCache: false });
						}

						reply.status(200).send({ ...result, fromCache: false });
						return;
					});
				}
			});
		}
	);

	return app;
}
