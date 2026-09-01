// Services
import {
	getArtistTrends,
	getSongsTrends,
	getPodcastsTrends,
	getArtistTrendsHistory,
	getSongsTrendsHistory,
	getPodcastsTrendsHistory,
} from "./spotify.service";

// Schema
import { Type } from "@sinclair/typebox";
import {
	ArtistTrendPayload,
	SongTrendPayload,
	PodcastTrendPayload,
} from "../../types/trendsResponseSchema";

// Types
import { Db } from "mongodb";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppInstance } from "../../types/appInstance";
import { isCacheResult } from "../../types/cache";

export default function spotifyRoutes(app: AppInstance, db: Db) {
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
					const result = await getArtistTrends(db);

					if (result?.e) {
						app.log.error(result.e);
						return reply.status(500).send();
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
					const result = await getSongsTrends(db);

					if (result?.e) {
						app.log.error(result.e);
						return reply.status(500).send();
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
					const result = await getPodcastsTrends(db);

					if (result?.e) {
						app.log.error(result.e);
						return reply.status(500).send();
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

	/* Artists history */
	app.get(
		"/api/spotify/artist-trends/history",
		{
			schema: {
				tags: ["Spotify"],
				summary: "Historial de posiciones de artistas",
				response: { 500: Type.Optional(Type.String()) },
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("spotify/artists-trends-history", async (error, cacheHit) => {
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
					const result = await getArtistTrendsHistory(db);

					if (result?.e) {
						app.log.error(result.e);
						return reply.status(500).send();
					}

					app.cache.set(
						"spotify/artists-trends-history",
						result,
						360000,
						err => {
							if (err) {
								console.log({ err });
								return err;
							}
							reply.status(200).send({ ...result, fromCache: false });
							return;
						}
					);
				}
			});
		}
	);

	/* Songs history */
	app.get(
		"/api/spotify/song-trends/history",
		{
			schema: {
				tags: ["Spotify"],
				summary: "Historial de posiciones de canciones",
				response: { 500: Type.Optional(Type.String()) },
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("spotify/songs-trends-history", async (error, cacheHit) => {
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
					const result = await getSongsTrendsHistory(db);

					if (result?.e) {
						app.log.error(result.e);
						return reply.status(500).send();
					}

					app.cache.set(
						"spotify/songs-trends-history",
						result,
						360000,
						err => {
							if (err) {
								console.log({ err });
								return err;
							}
							reply.status(200).send({ ...result, fromCache: false });
							return;
						}
					);
				}
			});
		}
	);

	/* Podcasts history */
	app.get(
		"/api/spotify/podcast-trends/history",
		{
			schema: {
				tags: ["Spotify"],
				summary: "Historial de posiciones de podcasts",
				response: { 500: Type.Optional(Type.String()) },
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get(
				"spotify/podcasts-trends-history",
				async (error, cacheHit) => {
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
						const result = await getPodcastsTrendsHistory(db);

						if (result?.e) {
							app.log.error(result.e);
							return reply.status(500).send();
						}

						app.cache.set(
							"spotify/podcasts-trends-history",
							result,
							360000,
							err => {
								if (err) {
									console.log({ err });
									return err;
								}
								reply.status(200).send({ ...result, fromCache: false });
								return;
							}
						);
					}
				}
			);
		}
	);

	return app;
}
