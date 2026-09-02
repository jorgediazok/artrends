// Types
import { Db } from "mongodb";
import { TrendRecord } from "../../types/trendsResponseSchema";

interface YoutubeTrend {
	title: string;
	link: string;
	amount: string;
	channel: string;
	channelLink: string;
}

export async function getYoutubeTrends(db: Db) {
	try {
		const trends = await db
			.collection<TrendRecord<YoutubeTrend>>("youtube")
			.find()
			.limit(2)
			.sort({ "record.date": -1 })
			.toArray();

		if (trends.length > 1) {
			const [current, previous] = trends;
			return { current, previous };
		}

		return {
			current: trends[0],
		};
	} catch (e) {
		console.log({ e });
		return { e };
	}
}

export async function getYoutubeTrendsHistory(db: Db, limit = 12) {
	try {
		const history = await db
			.collection<TrendRecord<YoutubeTrend>>("youtube")
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
