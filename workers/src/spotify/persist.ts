import { MongoClient } from "mongodb";

// Types
import type {
	SpotifyArtistData,
	SpotifyPodcastData,
	SpotifySongData,
	TrendsDataPayload,
} from "../typings";

export async function persistSongData(
	spotifySongData: SpotifySongData[],
	trendsDate: Date,
	databaseUri: string
) {
	console.log("trying to persist Spotify song data...");
	// Create a new MongoClient
	const client = new MongoClient(databaseUri);

	try {
		// Specifying a schema is optional, but it enables type hints on finds and inserts
		await client.connect();
		const res = await client
			.db("artrends")
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
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

export async function persistArtistData(
	spotifyArtistData: SpotifyArtistData[],
	trendsDate: Date,
	databaseUri: string
) {
	console.log("trying to persist Spotify artist data...");
	// Create a new MongoClient
	const client = new MongoClient(databaseUri);

	try {
		// Specifying a schema is optional, but it enables type hints on finds and inserts
		await client.connect();
		const res = await client
			.db("artrends")
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
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

export async function persistPodcastData(
	spotifyPodcastsData: SpotifyPodcastData[],
	trendsDate: Date,
	databaseUri: string
) {
	console.log("trying to persist Spotify podcast data...");
	// Create a new MongoClient
	const client = new MongoClient(databaseUri);

	try {
		// Specifying a schema is optional, but it enables type hints on finds and inserts
		await client.connect();
		const res = await client
			.db("artrends")
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
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
