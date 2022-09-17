import { MongoClient } from "mongodb";

// Types
import type { TrendsDataPayload, TrendsData } from "../typings";

export default async function persistTwitterTrends(
	dataToPersist: TrendsData[],
	trendsDate: Date,
	databaseUri: string
) {
	// Create a new MongoClient
	const client = new MongoClient(databaseUri);

	try {
		// Specifying a schema is optional, but it enables type hints on finds and inserts
		await client.connect();
		const res = await client
			.db("artrends")
			.collection<{
				[trend: string]: TrendsDataPayload;
			}>("twitter")
			.insertOne({
				record: {
					date: trendsDate,
					trends: dataToPersist,
				},
			});

		return res.acknowledged;
	} catch (e) {
		console.error(`[persistTwitterTrends]: ${e}`);
		return false;
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
