// Types
import { Db } from "mongodb";
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

export async function getTwitterTrendsHistory(db: Db, limit = 12) {
	try {
		const history = await db
			.collection<TrendRecord<TwitterTrend>>("twitter")
			.find()
			.limit(limit)
			.sort({ "record.date": -1 })
			.toArray();

		return { history };
	} catch (e) {
		console.log({ e });
		return { e };
	}
}
