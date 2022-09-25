import { schedule } from "node-cron";

/* Config */
import {
	GOOGLE_TRENDS_BASE_URL,
	TRENDS_ITEM_LIMIT,
	DATABASE_CONNECTION_URI,
	TWITTER_TRENDS_URL,
	SPOTIFY_TRENDS_STARTING_URL,
	SPOTIFY_TOP_PODCASTS_URL,
} from "./config";

/* Google */
import { getGoogleTrends } from "./google/scraper";
import persistGoogleTrends from "./google/persist";

/* Twitter */
import { getTwitterTrendingTopics } from "./twitter/scraper";
import persistTwitterTrends from "./twitter/persist";

/* Spotify */
import { getSpotifyTrends } from "./spotify/scraper";
import { getSpotifyTopPodcasts } from "./spotify/api";
import {
	persistArtistData,
	persistPodcastData,
	persistSongData,
} from "./spotify/persist";

/* Utils */
import {
	mergeTrendsResults,
	mergeSpotifyArtistResults,
	mergeSpotifySongsResults,
} from "./utils/mergeResults";

/* Google */
async function googleTrendsScraper() {
	try {
		const { trendsTitles, trendsLinks, amount } = await getGoogleTrends(
			GOOGLE_TRENDS_BASE_URL,
			TRENDS_ITEM_LIMIT
		);
		const trendData = mergeTrendsResults(trendsTitles, trendsLinks, amount);
		const trendDate = new Date();

		if (DATABASE_CONNECTION_URI) {
			persistGoogleTrends(trendData, trendDate, DATABASE_CONNECTION_URI);
		}
	} catch (e) {
		console.error(`[googleTrendsScraper]: ${e}`);
	}
}

// async function googleTrendsCleaner() {
// 	try {
// 		if (DATABASE_CONNECTION_URI) {
// 			await removeOldTrends(DATABASE_CONNECTION_URI, "google");
// 		}
// 	} catch (e) {
// 		console.error(`[googleTrendsCleaner]: ${e}`);
// 	}
// }

/* Twitter */
async function twitterTrendingTopicsScraper() {
	try {
		const { trendsTitles, trendsLinks, amount } =
			await getTwitterTrendingTopics(TWITTER_TRENDS_URL, TRENDS_ITEM_LIMIT);

		const trendData = mergeTrendsResults(trendsTitles, trendsLinks, amount);
		const trendDate = new Date();

		if (DATABASE_CONNECTION_URI) {
			persistTwitterTrends(trendData, trendDate, DATABASE_CONNECTION_URI);
		}
	} catch (e) {
		console.error(`[twitterTrendingTopicsScraper]: ${e}`);
	}
}

/* Spotify */
async function spotifyTopSongsAndArtistsScraper() {
	try {
		const { topArtists, topSongs } = await getSpotifyTrends(
			SPOTIFY_TRENDS_STARTING_URL,
			TRENDS_ITEM_LIMIT
		);

		const topArtistData = mergeSpotifyArtistResults(
			topArtists.artistNames,
			topArtists.artistStreak,
			topArtists.artistPrevPosition,
			topArtists.artistLinks
		);

		const topSongsData = mergeSpotifySongsResults(
			topSongs.songNames,
			topSongs.songAuthors,
			topSongs.songsLinks,
			topSongs.songPrevPosition,
			topSongs.songStreak,
			topSongs.songCount
		);

		if (DATABASE_CONNECTION_URI) {
			const date = new Date();
			await persistArtistData(topArtistData, date, DATABASE_CONNECTION_URI);
			await persistSongData(topSongsData, date, DATABASE_CONNECTION_URI);
		}
	} catch (e) {
		console.error(`[spotifyTopSongsAndArtistsScraper]: ${e}`);
	}
}

async function spotifyTopPodcasts() {
	try {
		const topPodcasts = await getSpotifyTopPodcasts(
			SPOTIFY_TOP_PODCASTS_URL,
			TRENDS_ITEM_LIMIT
		);

		if (DATABASE_CONNECTION_URI) {
			const date = new Date();
			await persistPodcastData(topPodcasts, date, DATABASE_CONNECTION_URI);
		}
	} catch (e) {
		console.error(`[spotifyTopPodcasts]: ${e}`);
	}
}

// async function twitterTrendsCleaner() {
// 	try {
// 		if (DATABASE_CONNECTION_URI) {
// 			await removeOldTrends(DATABASE_CONNECTION_URI, "twitter");
// 		}
// 	} catch (e) {
// 		console.error(`[twitterTrendsCleaner]: ${e}`);
// 	}
// }

/* Get Google trends cron - At 11 mins of every hour */
schedule("11 * * * *", googleTrendsScraper);

/* Get Twitter trends cron - At 22 mins of every hour */
schedule("22 * * * *", twitterTrendingTopicsScraper);

/* Get Spotify top songs and artists cron - At 3:30 every tuesday */
schedule("30 3 * * Tue", spotifyTopSongsAndArtistsScraper);

/* Get Spotify top pocasts cron - At 3:30 every wednesday */
schedule("30 3 * * Wed", spotifyTopPodcasts);

console.log("Worker started succesfully, waiting for jobs...");
