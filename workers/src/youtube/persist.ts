import { MongoClient } from "mongodb";

// Types
import type { YoutubeVideosData, TrendsDataPayload } from "../typings";

export default async function persistYoutubeTrends(
	dataToPersist: YoutubeVideosData[],
	trendsDate: Date,
	databaseUri: string
) {
	console.log("Trying to perist youtube data...");
	// Create a new MongoClient
	const client = new MongoClient(databaseUri);

	try {
		// Specifying a schema is optional, but it enables type hints on finds and inserts
		await client.connect();
		const res = await client
			.db("artrends")
			.collection<{
				[trend: string]: TrendsDataPayload<YoutubeVideosData>;
			}>("youtube")
			.insertOne({
				record: {
					date: trendsDate,
					trends: dataToPersist,
				},
			});

		return res.acknowledged;
	} catch (e) {
		console.error(`[persistYoutubeTrends]: ${e}`);
		return false;
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
