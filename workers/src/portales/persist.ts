import { MongoClient } from "mongodb";

// Utils
import { mergeTopArticleData } from "../utils/mergeResults";

// Types
import { PortalsData } from "../typings";

export async function persistPortalsData(
	portalsData: PortalsData,
	trendsDate: Date,
	databaseUri: string
) {
	console.log("trying to persist News Portals article data...");
	const client = new MongoClient(databaseUri);
	await client.connect();

	try {
		const portalsDataEntries = Object.entries(portalsData);

		for (const portalDataEntry of portalsDataEntries) {
			const [portalName, portalData] = portalDataEntry;

			await client
				.db("artrends")
				.collection(`portal.${portalName}`)
				.insertOne({
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
	} finally {
		client.close();
	}
}
