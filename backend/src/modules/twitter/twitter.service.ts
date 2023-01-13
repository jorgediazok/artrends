import { Db } from "mongodb";

// Types
import { TrendRecord } from "../../types/trendsResponseSchema";

interface TwitterTrend {
	title: string;
	link: string;
	amount: string;
}

export async function getTwitterTrends(db: Db) {
	try {
		const trends = await db
			.collection<TrendRecord<TwitterTrend>>("twitter")
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
