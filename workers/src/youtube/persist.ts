import { Db } from "mongodb";

// Types
import type { YoutubeVideosData, TrendsDataPayload } from "../typings";

export default async function persistYoutubeTrends(
	dataToPersist: YoutubeVideosData[],
	trendsDate: Date,
	db: Db
) {
	try {
		const res = await db
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
	}
}
