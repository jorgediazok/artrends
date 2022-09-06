import { schedule } from "node-cron";

/* Config */
import {
	GOOGLE_TRENDS_BASE_URL,
	GOOGLE_TRENDS_ITEM_LIMIT,
	DATABASE_CONNECTION_URI,
} from "./config";

/* Google */
import { getGoogleTrends } from "./google/scraper";
import persistGoogleTrends from "./google/persist";
import removeOldTrends from "./google/clean";
import mergeGoogleResults from "./utils/mergeResults";

async function googleTrendsScraper() {
	try {
		const { trendsTitles, trendsLinks, searchCounts } = await getGoogleTrends(
			GOOGLE_TRENDS_BASE_URL,
			GOOGLE_TRENDS_ITEM_LIMIT
		);
		const trendData = mergeGoogleResults(
			trendsTitles,
			trendsLinks,
			searchCounts
		);
		const trendDate = new Date();

		if (DATABASE_CONNECTION_URI) {
			persistGoogleTrends(trendData, trendDate, DATABASE_CONNECTION_URI);
		}
	} catch (e) {
		console.error(`[googleTrendsScraper]: ${e}`);
	}
}

async function googleTrendsCleaner() {
	try {
		if (DATABASE_CONNECTION_URI) {
			await removeOldTrends(DATABASE_CONNECTION_URI);
		}
	} catch (e) {
		console.error(`[googleTrendsCleaner]: ${e}`);
	}
}

/* Get trends cron - At 20 mins of every hour */
schedule("20 * * * *", googleTrendsScraper);

/* Remove old trends - Every 59 minutes */
schedule("*/59 * * * *", googleTrendsCleaner);

console.log("App started succesfully, waiting for jobs...");
