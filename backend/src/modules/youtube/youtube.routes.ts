/* Services */
import { getYoutubeTrends } from "./youtube.service";

// Schema
import { Type } from "@sinclair/typebox";
import { YoutubeTrendPayload } from "../../types/trendsResponseSchema";

// Types
import { Db } from "mongodb";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppInstance } from "../../types/appInstance";
import { isCacheResult } from "../../types/cache";

export default function youtubeRoutes(app: AppInstance, db: Db) {
	return app.get(
		"/api/youtube-trends",
		{
			schema: {
				tags: ["Youtube"],
				response: {
					500: Type.Optional(Type.String()),
					default: YoutubeTrendPayload,
				},
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("youtube-trends", async (error, cacheHit) => {
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
					const result = await getYoutubeTrends(db);

					if (result.e) {
						app.log.error(result.e);
						return reply.status(500).send();
					}

					app.cache.set("youtube-trends", result, 360000, err => {
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
}
