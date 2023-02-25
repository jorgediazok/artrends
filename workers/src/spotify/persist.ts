// Types
import { Db } from "mongodb";
import type {
	SpotifyArtistData,
	SpotifyPodcastData,
	SpotifySongData,
	TrendsDataPayload,
} from "../typings";

export async function persistSongData(
	spotifySongData: SpotifySongData[],
	trendsDate: Date,
	db: Db
) {
	try {
		console.log("trying to persist Spotify song data...");
		const res = await db
			.collection<{
				[trend: string]: TrendsDataPayload<SpotifySongData>;
			}>("spotify.songs")
			.insertOne({
				record: {
					date: trendsDate,
					trends: spotifySongData,
				},
			});

		return res.acknowledged;
	} catch (e) {
		console.error(`[persistSongData]: ${e}`);
		return false;
	}
}

export async function persistArtistData(
	spotifyArtistData: SpotifyArtistData[],
	trendsDate: Date,
	db: Db
) {
	try {
		console.log("trying to persist Spotify artist data...");
		// Specifying a schema is optional, but it enables type hints on finds and inserts
		const res = await db
			.collection<{
				[trend: string]: TrendsDataPayload<SpotifyArtistData>;
			}>("spotify.artists")
			.insertOne({
				record: {
					date: trendsDate,
					trends: spotifyArtistData,
				},
			});

		return res.acknowledged;
	} catch (e) {
		console.error(`[persistArtistData]: ${e}`);
		return false;
	}
}

export async function persistPodcastData(
	spotifyPodcastsData: SpotifyPodcastData[],
	trendsDate: Date,
	db: Db
) {
	try {
		console.log("trying to persist Spotify podcast data...");

		const res = await db
			.collection<{
				[trend: string]: TrendsDataPayload<SpotifyPodcastData>;
			}>("spotify.podcasts")
			.insertOne({
				record: {
					date: trendsDate,
					trends: spotifyPodcastsData,
				},
			});

		return res.acknowledged;
	} catch (e) {
		console.error(`[persistPodcastData]: ${e}`);
		return false;
	}
}
