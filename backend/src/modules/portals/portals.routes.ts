// Services
import { getPortalTrends, getPortalsHistory } from "./portals.service";

// Schema
import { Type } from "@sinclair/typebox";

// Types
import { Db } from "mongodb";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppInstance } from "../../types/appInstance";
import { isCacheResult } from "../../types/cache";

export default function portalRoutes(app: AppInstance, db: Db) {
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
					console.log({ cache: cacheHit.stored });
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
					const result = await getPortalTrends(db);
					console.log({ noCache: result });

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

	app.get(
		"/api/portals/history",
		{
			schema: {
				tags: ["Portals"],
				summary: "Historial de posiciones de portales",
				response: {
					500: Type.Optional(Type.String()),
				},
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("portal-trends-history", async (error, cacheHit) => {
				if (error) {
					console.log("Error", error);
					reply.status(500).send(error);
					return;
				}
				if (isCacheResult(cacheHit)) {
					if (cacheHit.stored) {
						reply.status(200).send({ ...cacheHit.item, fromCache: true });
						return;
					}
				}

				if (!cacheHit) {
					const result = await getPortalsHistory(db);

					app.cache.set("portal-trends-history", result, 360000, err => {
						if (err) {
							console.log({ err });
							return err;
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
