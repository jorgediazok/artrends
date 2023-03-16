import { schedule } from "node-cron";

/* Config */
import {
	GOOGLE_TRENDS_BASE_URL,
	TRENDS_ITEM_LIMIT,
	DATABASE_CONNECTION_URI,
	TWITTER_TRENDS_URL,
	SPOTIFY_TRENDS_STARTING_URL,
	SPOTIFY_TOP_PODCASTS_URL,
	YOUTUBE_TRENDS_URL,
} from "./config";

/* DB Connection */
import { connection } from "./db/connection";

/* Types*/
import { Db } from "mongodb";

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

/* Youtube */
import { getYoutubeTrendingVideos } from "./youtube/scraper";
import persistYoutubeTrends from "./youtube/persist";

/* Portales */
import { getPortalsMostRead } from "./portales/scraper";
import { persistPortalsData } from "./portales/persist";

/* Utils */
import {
	mergeTrendsResults,
	mergeSpotifyArtistResults,
	mergeSpotifySongsResults,
	mergeYoutubeVideosResults,
} from "./utils/mergeResults";

/* Google */
async function googleTrendsScraper(db: Db) {
	try {
		const { trendsTitles, trendsLinks, amount } = await getGoogleTrends(
			GOOGLE_TRENDS_BASE_URL,
			TRENDS_ITEM_LIMIT
		);
		const trendData = mergeTrendsResults(trendsTitles, trendsLinks, amount);
		const trendDate = new Date();

		if (DATABASE_CONNECTION_URI) {
			persistGoogleTrends(trendData, trendDate, db);
		}
	} catch (e) {
		console.error(`[googleTrendsScraper]: ${e}`);
	}
}

/* Twitter */
async function twitterTrendingTopicsScraper(db: Db) {
	try {
		const { trendsTitles, trendsLinks, amount } =
			await getTwitterTrendingTopics(TWITTER_TRENDS_URL, TRENDS_ITEM_LIMIT);

		const trendData = mergeTrendsResults(trendsTitles, trendsLinks, amount);
		const trendDate = new Date();

		if (DATABASE_CONNECTION_URI) {
			persistTwitterTrends(trendData, trendDate, db);
		}
	} catch (e) {
		console.error(`[twitterTrendingTopicsScraper]: ${e}`);
	}
}

/* Spotify */
async function spotifyTopSongsAndArtistsScraper(db: Db) {
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
			await persistArtistData(topArtistData, date, db);
			await persistSongData(topSongsData, date, db);
		}
	} catch (e) {
		console.error(`[spotifyTopSongsAndArtistsScraper]: ${e}`);
	}
}

async function spotifyTopPodcasts(db: Db) {
	try {
		const topPodcasts = await getSpotifyTopPodcasts(
			SPOTIFY_TOP_PODCASTS_URL,
			TRENDS_ITEM_LIMIT
		);

		if (DATABASE_CONNECTION_URI) {
			const date = new Date();
			await persistPodcastData(topPodcasts, date, db);
		}
	} catch (e) {
		console.error(`[spotifyTopPodcasts]: ${e}`);
	}
}

async function youtubeTopVideos(db: Db) {
	try {
		const topVideos = await getYoutubeTrendingVideos(
			YOUTUBE_TRENDS_URL,
			TRENDS_ITEM_LIMIT
		);

		const topVideosData = mergeYoutubeVideosResults(
			topVideos.trendsTitles,
			topVideos.trendsLinks,
			topVideos.channels,
			topVideos.channelsLinks,
			topVideos.amount
		);

		if (DATABASE_CONNECTION_URI) {
			const date = new Date();
			await persistYoutubeTrends(topVideosData, date, db);
		}
	} catch (e) {
		console.error(`[youtubeTopVideos]: ${e}`);
	}
}

async function portalsMostReadArticles(db: Db) {
	try {
		const topArticles = await getPortalsMostRead(4);

		if (DATABASE_CONNECTION_URI && topArticles) {
			const date = new Date();
			console.log({ topArticles });
			await persistPortalsData(topArticles, date, db);
		}
	} catch (error) {
		console.error(`[portalsMostReadArticles]: ${error}`);
	}
}

async function bootstrap() {
	const db = await connection();

	/* Get Google trends cron - At 11 mins of every hour */
	schedule("11 * * * *", () => googleTrendsScraper(db));

	/* Get Twitter trends cron - At 22 mins of every hour */
	schedule("22 * * * *", () => twitterTrendingTopicsScraper(db));

	/* Get Youtube trends cron - At 33 mins every two hours */
	schedule("0 33 */2 * * *", () => youtubeTopVideos(db));

	/* Get portals top articles cron - At 44 every hour */
	schedule("44 * * * *", () => portalsMostReadArticles(db));

	/* Get Spotify top songs and artists cron - At 3:30 every sunday */
	schedule("30 3 * * Sun", () => spotifyTopSongsAndArtistsScraper(db));

	/* Get Spotify top pocasts cron - At 3:50 every sunday */
	schedule("50 3 * * Sun", () => spotifyTopPodcasts(db));

	console.log("Worker started succesfully, waiting for jobs...");
}

bootstrap();
