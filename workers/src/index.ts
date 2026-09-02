import { schedule } from "node-cron";

/* DB Connection */
import { connection } from "./db/connection";

/* Jobs */
import {
	googleTrendsScraper,
	twitterTrendingTopicsScraper,
	spotifyTopSongsAndArtistsScraper,
	spotifyTopPodcasts,
	youtubeTopVideos,
	portalsMostReadArticles,
} from "./jobs";

async function bootstrap() {
	const db = await connection();

	/* Get Google trends cron - At 11 mins of every hour */
	schedule("11 * * * *", () => googleTrendsScraper(db));

	/* Get Twitter trends cron - At 22 mins of every hour */
	schedule("21 * * * *", () => twitterTrendingTopicsScraper(db));

	/* Get Youtube trends cron - At 33 mins every two hours */
	schedule("0 33 */2 * * *", () => youtubeTopVideos(db));

	/* Get portals top articles cron - At 44 every hour */
	schedule("44 * * * *", () => portalsMostReadArticles(db));

	/* Get Spotify top songs and artists cron - At 3:30 every Friday */
	schedule("40 20 * * Sun", () => spotifyTopSongsAndArtistsScraper(db));

	/* Get Spotify top pocasts cron - At 3:50 every Friday */
	schedule("50 20 * * Sun", () => spotifyTopPodcasts(db));

	console.log("Worker started succesfully, waiting for jobs...");
}

bootstrap();
