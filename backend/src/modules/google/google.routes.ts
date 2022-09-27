/* Services */
import { getGoogleTrends } from "./google.service";

// Schema
import { Type } from "@sinclair/typebox";
import { TrendPayload } from "../../types/trendsResponseSchema";

// Types
import { FastifyReply, FastifyRequest } from "fastify";
import { AppInstance } from "../../types/appInstance";
import { isCacheResult } from "../../types/cache";

export default function googleRoutes(app: AppInstance) {
	return app.get(
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
					const result = await getGoogleTrends();

					if (result.e) {
						app.log.error(result.e);
						return reply.status(500);
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
}
