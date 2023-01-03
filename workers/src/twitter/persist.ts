// Types
import { Db } from "mongodb";
import type { TrendsDataPayload, TrendsData } from "../typings";

export default async function persistTwitterTrends(
	dataToPersist: TrendsData[],
	trendsDate: Date,
	db: Db
) {
	try {
		console.log("Trying to persist Twitter data...");

		const res = await db
			.collection<{
				[trend: string]: TrendsDataPayload<TrendsData>;
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
	}
}
