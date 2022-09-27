import { MongoClient } from "mongodb";

// Types
import { TrendRecord } from "../../types/trendsResponseSchema";

/* Environment variables */
import { DATABASE_CONNECTION_URI } from "../../config";

export async function getTwitterTrends() {
	try {
		const client = new MongoClient(DATABASE_CONNECTION_URI);
		const trends = await client
			.db("artrends")
			.collection<TrendRecord>("twitter")
			.find()
			.limit(2)
			.sort({ "record.date": -1 })
			.toArray();

		if (trends.length > 1) {
			const [current, previous] = trends;
			return { current, previous };
		}

		return {
			current: trends,
		};
	} catch (e) {
		console.log({ e });
		return { e };
	}
}
