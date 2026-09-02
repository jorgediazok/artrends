/* Config */
import {
	GOOGLE_TRENDS_BASE_URL,
	TRENDS_ITEM_LIMIT,
	DATABASE_CONNECTION_URI,
	TWITTER_TRENDS_URL,
	SPOTIFY_TRENDS_STARTING_URL,
	SPOTIFY_TOP_PODCASTS_URL,
	YOUTUBE_API_KEY,
} from "./config";

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
export async function googleTrendsScraper(db: Db) {
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
export async function twitterTrendingTopicsScraper(db: Db) {
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
export async function spotifyTopSongsAndArtistsScraper(db: Db) {
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

export async function spotifyTopPodcasts(db: Db) {
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

export async function youtubeTopVideos(db: Db) {
	if (!YOUTUBE_API_KEY) {
		console.error(
			"[youtubeTopVideos]: skipped, YOUTUBE_API_KEY is not set"
		);
		return;
	}

	try {
		const topVideos = await getYoutubeTrendingVideos(
			YOUTUBE_API_KEY,
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

export async function portalsMostReadArticles(db: Db) {
	try {
		const topArticles = await getPortalsMostRead(4);

		if (DATABASE_CONNECTION_URI && topArticles) {
			const date = new Date();
			await persistPortalsData(topArticles, date, db);
		}
	} catch (error) {
		console.error(`[portalsMostReadArticles]: ${error}`);
	}
}
