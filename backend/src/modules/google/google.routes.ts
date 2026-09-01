/* Services */
import { getGoogleTrends, getGoogleTrendsHistory } from "./google.service";

// Schema
import { Type } from "@sinclair/typebox";
import { TrendPayload } from "../../types/trendsResponseSchema";

// Types
import { FastifyReply, FastifyRequest } from "fastify";
import { Db } from "mongodb";
import { AppInstance } from "../../types/appInstance";
import { isCacheResult } from "../../types/cache";

export default function googleRoutes(app: AppInstance, db: Db) {
	app.get(
		"/api/google-trends",
		{
			schema: {
				tags: ["Google"],
				response: {
					500: Type.Optional(Type.String()),
					default: TrendPayload,
				},
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("google-trends", async (error, cacheHit) => {
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
					const result = await getGoogleTrends(db);

					if (result.e) {
						app.log.error(result.e);
						return reply.status(500).send();
					}

					app.cache.set("google-trends", result, 360000, err => {
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

	app.get(
		"/api/google-trends/history",
		{
			schema: {
				tags: ["Google"],
				summary: "Historial de posiciones",
				response: {
					500: Type.Optional(Type.String()),
				},
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("google-trends-history", async (error, cacheHit) => {
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
					const result = await getGoogleTrendsHistory(db);

					if (result.e) {
						app.log.error(result.e);
						return reply.status(500).send();
					}

					app.cache.set("google-trends-history", result, 360000, err => {
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
