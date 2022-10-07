// Services
import {
	getArtistTrends,
	getSongsTrends,
	getPodcastsTrends,
} from "./spotify.service";

// Schema
import { Type } from "@sinclair/typebox";
import {
	ArtistTrendPayload,
	SongTrendPayload,
	PodcastTrendPayload,
} from "../../types/trendsResponseSchema";

// Types
import { FastifyReply, FastifyRequest } from "fastify";
import { AppInstance } from "../../types/appInstance";
import { isCacheResult } from "../../types/cache";

export default function spotifyRoutes(app: AppInstance) {
	/* Artists trends */
	app.get(
		"/api/spotify/artist-trends",
		{
			schema: {
				tags: ["Spotify"],
				summary: "Artist trends",
				response: {
					500: Type.Optional(Type.String()),
					default: ArtistTrendPayload,
				},
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("spotify/artists-trends", async (error, cacheHit) => {
				if (error) {
					console.log("Error", error);
					reply.status(500).send(error);
					return;
				}
				if (isCacheResult(cacheHit)) {
					if (cacheHit.stored) {
						if (!cacheHit.item) {
							return reply.status(200).send({ current: null, fromCache: true });
						} else {
							return reply
								.status(200)
								.send({ ...cacheHit.item, fromCache: true });
						}
					}
				}

				if (!cacheHit) {
					const result = await getArtistTrends();

					if (result?.e) {
						app.log.error(result.e);
						return reply.status(500);
					}

					app.cache.set("spotify/artists-trends", result, 360000, err => {
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

	/* Song trends */
	app.get(
		"/api/spotify/song-trends",
		{
			schema: {
				tags: ["Spotify"],
				summary: "Song trends",
				response: {
					500: Type.Optional(Type.String()),
					default: SongTrendPayload,
				},
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("spotify/songs-trends", async (error, cacheHit) => {
				if (error) {
					console.log("Error", error);
					reply.status(500).send(error);
					return;
				}
				if (isCacheResult(cacheHit)) {
					if (cacheHit.stored) {
						if (!cacheHit.item) {
							return reply.status(200).send({ current: null, fromCache: true });
						} else {
							return reply
								.status(200)
								.send({ ...cacheHit.item, fromCache: true });
						}
					}
				}

				if (!cacheHit) {
					const result = await getSongsTrends();

					if (result?.e) {
						app.log.error(result.e);
						return reply.status(500);
					}

					app.cache.set("spotify/songs-trends", result, 360000, err => {
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

	/* Podcast trends */
	app.get(
		"/api/spotify/podcast-trends",
		{
			schema: {
				tags: ["Spotify"],
				summary: "Podcast trends",
				response: {
					500: Type.Optional(Type.String()),
					default: PodcastTrendPayload,
				},
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("spotify/podcasts-trends", async (error, cacheHit) => {
				if (error) {
					console.log("Error", error);
					reply.status(500).send(error);
					return;
				}
				if (isCacheResult(cacheHit)) {
					if (cacheHit.stored) {
						if (!cacheHit.item) {
							return reply.status(200).send({ current: null, fromCache: true });
						} else {
							return reply
								.status(200)
								.send({ ...cacheHit.item, fromCache: true });
						}
					}
				}

				if (!cacheHit) {
					const result = await getPodcastsTrends();

					if (result?.e) {
						app.log.error(result.e);
						return reply.status(500);
					}

					app.cache.set("spotify/podcasts-trends", result, 360000, err => {
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
