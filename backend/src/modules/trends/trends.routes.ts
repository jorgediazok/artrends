/* Services */
import { getGoogleTrends } from "../../modules/google/google.service";
import { getYoutubeTrends } from "../../modules/youtube/youtube.service";
import { getPortalTrends } from "../../modules/portals/portals.service";
import {
	getArtistTrends,
	getPodcastsTrends,
	getSongsTrends,
} from "../../modules/spotify/spotify.service";
import { getTwitterTrends } from "../../modules/twitter/twitter.service";

// Schema
import { Type } from "@sinclair/typebox";

// Types
import { Db } from "mongodb";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppInstance } from "../../types/appInstance";
import { isCacheResult } from "../../types/cache";

export default function trendsRoutes(app: AppInstance, db: Db) {
	return app.get(
		"/api/trends",
		{
			schema: {
				tags: ["Trends"],
				response: {
					500: Type.Optional(Type.String()),
					// default: AllTrendsPayload)
				},
			},
		},
		(_req: FastifyRequest, reply: FastifyReply) => {
			app.cache.get("all-trends", async (error, cacheHit) => {
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
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const output: any = {};

					const queries = [
						getTwitterTrends(db),
						getGoogleTrends(db),
						getYoutubeTrends(db),
						getArtistTrends(db),
						getPodcastsTrends(db),
						getSongsTrends(db),
						getPortalTrends(db),
					];

					const [
						twitterTrends,
						googleTrends,
						youtubeTrends,
						spotifyArtistsTrends,
						spotifyPodcastsTrends,
						spotifySongsTrends,
						portalsTrends,
					] = await Promise.all(queries);

					if (twitterTrends) {
						output.twitter = twitterTrends;
					}

					if (googleTrends) {
						output.google = googleTrends;
					}

					if (youtubeTrends) {
						output.youtube = youtubeTrends;
					}

					if (spotifyArtistsTrends) {
						output.spotifyArtists = spotifyArtistsTrends;
					}

					if (spotifyPodcastsTrends) {
						output.spotifyPodcasts = spotifyPodcastsTrends;
					}

					if (spotifySongsTrends) {
						output.spotifySongs = spotifySongsTrends;
					}

					if (portalsTrends) {
						output.portals = portalsTrends;
					}

					app.cache.set("all-trends", output, 360000, err => {
						if (err) {
							console.log({ err });
							return err;
						}

						reply.status(200).send({ ...output, fromCache: false });
						return;
					});
				}
			});
		}
	);
}
