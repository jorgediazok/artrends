// Types
import { Db } from "mongodb";
import { TrendRecord } from "../../types/trendsResponseSchema";

interface GoogleTrend {
	title: string;
	link: string;
	searchCount: string;
}

export async function getGoogleTrends(db: Db) {
	try {
		const trends = await db
			.collection<TrendRecord<GoogleTrend>>("google")
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
