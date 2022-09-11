import { MongoClient } from "mongodb";

// Types
import { TrendRecord } from "../../types/trendsResponseSchema";

/* Environment variables */
import { DATABASE_CONNECTION_URI } from "../../config";

export async function getGoogleTrends() {
	try {
		const client = new MongoClient(DATABASE_CONNECTION_URI);
		const trends = await client
			.db("artrends")
			.collection<TrendRecord>("google")
			.find()
			.limit(2)
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
