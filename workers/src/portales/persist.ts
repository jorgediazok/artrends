// Utils
import { mergeTopArticleData } from "../utils/mergeResults";

// Types
import { Db } from "mongodb";
import { PortalsData } from "../typings";

export async function persistPortalsData(
	portalsData: PortalsData,
	trendsDate: Date,
	db: Db
) {
	console.log("trying to persist News Portals article data...");

	try {
		const portalsDataEntries = Object.entries(portalsData);

		for (const portalDataEntry of portalsDataEntries) {
			const [portalName, portalData] = portalDataEntry;

			if (!portalData.length) return;

			await db.collection(`portal.${portalName}`).insertOne({
				record: {
					date: trendsDate,
					trends: mergeTopArticleData(portalData),
				},
			});
		}

		return true;
	} catch (error) {
		console.error(`[persistPortalsData]: ${error}`);
		return false;
	}
}
