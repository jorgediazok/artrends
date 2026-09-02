import axios from "axios";

interface YoutubeApiItem {
	id: string;
	snippet: {
		title: string;
		channelId: string;
		channelTitle: string;
	};
	statistics?: {
		viewCount?: string;
	};
}

interface YoutubeApiResponse {
	items: YoutubeApiItem[];
}

/* YouTube's own public "Trending" page was discontinued (it now redirects
 * to the homepage) and YouTube Charts (charts.youtube.com, what this used
 * to scrape) is a YouTube Music product - it only ever covers music
 * videos, there's no general-video category on it. The only source left
 * for real general trending videos per country is the official YouTube
 * Data API v3's `mostPopular` chart, which is what actually powered the
 * old public Trending tab. */
export const getYoutubeTrendingVideos = async (
	apiKey: string,
	itemLimit: number
) => {
	const { data } = await axios.get<YoutubeApiResponse>(
		"https://www.googleapis.com/youtube/v3/videos",
		{
			params: {
				part: "snippet,statistics",
				chart: "mostPopular",
				regionCode: "AR",
				maxResults: itemLimit,
				key: apiKey,
			},
		}
	);

	const items = (data.items || []).slice(0, itemLimit);

	const trendsTitles = items.map(item => item.snippet.title);
	const trendsLinks = items.map(
		item => `https://www.youtube.com/watch?v=${item.id}`
	);
	const channels = items.map(item => item.snippet.channelTitle);
	const channelsLinks = items.map(
		item => `https://www.youtube.com/channel/${item.snippet.channelId}`
	);
	/* The API returns a lifetime cumulative view count (unlike the old
	 * music chart's weekly figure) - comma-format it for display, but
	 * don't relabel it as "weekly" anywhere downstream. */
	const amount = items.map(item =>
		item.statistics?.viewCount
			? Number(item.statistics.viewCount).toLocaleString("es-AR")
			: ""
	);

	return { trendsTitles, trendsLinks, channels, channelsLinks, amount };
};
