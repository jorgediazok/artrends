import axios from "axios";

// Types
import { SpotifyPodcastApiData, SpotifyPodcastData } from "../typings";

export const getSpotifyTopPodcasts = async (
	url: string,
	itemLimit: number
): Promise<SpotifyPodcastData[]> => {
	const { data } = await axios.get<SpotifyPodcastApiData[]>(url);
	const topPodcasts = data.slice(0, itemLimit);

	return topPodcasts.map(podcast => ({
		name: podcast.showName,
		chartMovement: podcast.chartRankMove,
		publisher: podcast.showPublisher,
		imageUrl: podcast.showImageUrl,
		link: podcast.showUri,
	}));
};
