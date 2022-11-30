/* Services */
import { getYoutubeTrends } from "./youtube.service";

// Schema
import { Type } from "@sinclair/typebox";
import { TrendPayload } from "../../types/trendsResponseSchema";

// Types
import { FastifyReply, FastifyRequest } from "fastify";
import { AppInstance } from "../../types/appInstance";
import { isCacheResult } from "../../types/cache";

export default function youtubeRoutes(app: AppInstance) {
	return app.get(
		"/api/youtube-trends",
		{
			schema: {
				tags: ["Youtube"],
				response: {
					500: Type.Optional(Type.String()),
					default: TrendPayload,
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
					const result = await getYoutubeTrends();

					if (result.e) {
						app.log.error(result.e);
						return reply.status(500);
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
