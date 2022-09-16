import { schedule } from "node-cron";

/* Config */
import {
	GOOGLE_TRENDS_BASE_URL,
	TRENDS_ITEM_LIMIT,
	DATABASE_CONNECTION_URI,
	TWITTER_TRENDS_URL,
} from "./config";

/* Google */
import { getGoogleTrends } from "./google/scraper";
import persistGoogleTrends from "./google/persist";

/* Twitter */
import { getTwitterTrendingTopics } from "./twitter/api";
import persistTwitterTrends from "./twitter/persist";

/* Utils */
import mergeTrendsResults from "./utils/mergeResults";
import removeOldTrends from "./utils/removeOldTrends";

/* Google */
async function googleTrendsScraper() {
	try {
		const { trendsTitles, trendsLinks, searchCounts } = await getGoogleTrends(
			GOOGLE_TRENDS_BASE_URL,
			TRENDS_ITEM_LIMIT
		);
		const trendData = mergeTrendsResults(
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
			await removeOldTrends(DATABASE_CONNECTION_URI, "google");
		}
	} catch (e) {
		console.error(`[googleTrendsCleaner]: ${e}`);
	}
}

/* Twitter */
// async function twitterTrendingTopicsScraper() {
// 	try {
// 		const { trendsTitles, trendsLinks, searchCounts } =
// 			await getTwitterTrendingTopics(TWITTER_TRENDS_URL, TRENDS_ITEM_LIMIT);

// 		const trendData = mergeTrendsResults(
// 			trendsTitles,
// 			trendsLinks,
// 			searchCounts
// 		);
// 		const trendDate = new Date();

// 		if (DATABASE_CONNECTION_URI) {
// 			persistTwitterTrends(trendData, trendDate, DATABASE_CONNECTION_URI);
// 		}
// 	} catch (e) {
// 		console.error(`[twitterTrendingTopicsScraper]: ${e}`);
// 	}
// }

async function twitterTrendingTopics() {
	try {
		const twitterData = await getTwitterTrendingTopics(
			TWITTER_TRENDS_URL,
			TRENDS_ITEM_LIMIT
		);
		const trendDate = new Date();

		if (DATABASE_CONNECTION_URI) {
			persistTwitterTrends(twitterData, trendDate, DATABASE_CONNECTION_URI);
		}
	} catch (e) {
		console.error(`[twitterTrendingTopicsScraper]: ${e}`);
	}
}

async function twitterTrendsCleaner() {
	try {
		if (DATABASE_CONNECTION_URI) {
			await removeOldTrends(DATABASE_CONNECTION_URI, "twitter");
		}
	} catch (e) {
		console.error(`[twitterTrendsCleaner]: ${e}`);
	}
}

/* Get Google trends cron - At 20 mins of every hour */
schedule("21 * * * *", googleTrendsScraper);

/* Get Twitter trends cron - At 05 mins of every hour */
schedule("13 * * * *", twitterTrendingTopics);

/* Remove old Google trends - At 01:10 am */
schedule("10 1 * * *", googleTrendsCleaner, {
	scheduled: true,
	timezone: "America/Buenos_Aires",
});

/* Remove old Twitter trends - At 01:20 am */
schedule("48 17 * * *", twitterTrendsCleaner, {
	scheduled: true,
	timezone: "America/Buenos_Aires",
});

console.log("Worker started succesfully, waiting for jobs...");
