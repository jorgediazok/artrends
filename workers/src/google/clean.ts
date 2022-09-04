import { MongoClient } from "mongodb";
import subDays from "date-fns/subDays";

// Types
import type { GoogleTrendsDataPayload } from "typings";

export default async function removeOldGoogleTrends(databaseUri: string) {
	console.log("trying to remove old data...");
	// Create a new MongoClient
	const client = new MongoClient(databaseUri);
	const dbName = "trends";

	try {
		// Specifying a schema is optional, but it enables type hints on finds and inserts
		const db = client.db(dbName);

		const trendsCollection = db.collection<{
			[trend: string]: GoogleTrendsDataPayload;
		}>("trends");

		const twoDaysAgo = subDays(new Date(), 2);

		const res = await trendsCollection.deleteMany({
			date: {
				$lte: twoDaysAgo,
			},
		});

		return res.acknowledged;
	} catch (e) {
		console.error(`[removeOldGoogleTrends]: ${JSON.stringify(e)}`);
		return false;
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
