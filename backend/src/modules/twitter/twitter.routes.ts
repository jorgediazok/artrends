/* Services */
import { getTwitterTrends, getTwitterTrendsHistory } from "./twitter.service";

// Schema
import { Type } from "@sinclair/typebox";
import { TrendPayload } from "../../types/trendsResponseSchema";

// Types
import { Db } from "mongodb";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppInstance } from "../../types/appInstance";
import { isCacheResult } from "../../types/cache";

export default function twitterRoutes(app: AppInstance, db: Db) {
	app.get(
		"/api/twitter-trends",
		{
			schema: {
				tags: ["Twitter"],
				response: {
					500: Type.Optional(Type.String()),
					default: TrendPayload,
				},
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("twitter-trends", async (error, cacheHit) => {
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
					const result = await getTwitterTrends(db);

					if (result.e) {
						app.log.error(result.e);
						return reply.status(500).send();
					}

					app.cache.set("twitter-trends", result, 360000, err => {
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
		"/api/twitter-trends/history",
		{
			schema: {
				tags: ["Twitter"],
				summary: "Historial de posiciones",
				response: {
					500: Type.Optional(Type.String()),
				},
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("twitter-trends-history", async (error, cacheHit) => {
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
					const result = await getTwitterTrendsHistory(db);

					if (result.e) {
						app.log.error(result.e);
						return reply.status(500).send();
					}

					app.cache.set("twitter-trends-history", result, 360000, err => {
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
