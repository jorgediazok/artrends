// Types
import { Db } from "mongodb";
import type { TrendsData, TrendsDataPayload } from "../typings";

export default async function persistGoogleTrends(
	dataToPersist: TrendsData[],
	trendsDate: Date,
	db: Db
) {
	try {
		console.log("trying to persistGoogleTrends data...");
		const res = await db
			.collection<{
				[trend: string]: TrendsDataPayload<TrendsData>;
			}>("google")
			.insertOne({
				record: {
					date: trendsDate,
					trends: dataToPersist,
				},
			});

		return res.acknowledged;
	} catch (e) {
		console.error(`[persistGoogleTrends]: ${e}`);
		return false;
	}
}
