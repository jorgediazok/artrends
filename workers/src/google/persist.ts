import { MongoClient } from "mongodb";

// Types
import type { TrendsData, TrendsDataPayload } from "../typings";

export default async function persistGoogleTrends(
	dataToPersist: TrendsData[],
	trendsDate: Date,
	databaseUri: string
) {
	console.log("trying to persist data...");
	// Create a new MongoClient
	const client = new MongoClient(databaseUri);

	try {
		// Specifying a schema is optional, but it enables type hints on finds and inserts
		await client.connect();
		const res = await client
			.db("artrends")
			.collection<{
				[trend: string]: TrendsDataPayload<TrendsData>;
			}>("google")
			.insertOne({
				record: {
					date: trendsDate,
					trends: dataToPersist,
				},
			});

		return res.acknowledged;
	} catch (e) {
		console.error(`[persistGoogleTrends]: ${e}`);
		return false;
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
