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

	try {
		Object.entries(portalsData).forEach(async ([portalName, portalData]) => {
			const client = new MongoClient(databaseUri);
			await client.connect();

			client
				.db("artrends")
				.collection(`portal.${portalName}`)
				.insertOne({
					record: {
						date: trendsDate,
						trends: mergeTopArticleData(portalData),
					},
				});
			await client.close();
		});

		return true;
	} catch (error) {
		console.error(`[persistPortalsData]: ${error}`);
		return false;
	}
}
