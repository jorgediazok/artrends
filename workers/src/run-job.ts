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

const jobs = {
	google: googleTrendsScraper,
	twitter: twitterTrendingTopicsScraper,
	youtube: youtubeTopVideos,
	portals: portalsMostReadArticles,
	"spotify-songs-artists": spotifyTopSongsAndArtistsScraper,
	"spotify-podcasts": spotifyTopPodcasts,
};

async function main() {
	const jobName = process.argv[2] as keyof typeof jobs;
	const job = jobs[jobName];

	if (!job) {
		console.error(
			`Unknown job "${jobName}". Valid jobs: ${Object.keys(jobs).join(", ")}`
		);
		process.exit(1);
	}

	const db = await connection();
	await job(db);

	console.log(`[run-job] "${jobName}" finished`);
	process.exit(0);
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});
