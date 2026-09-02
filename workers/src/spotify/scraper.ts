import { chromium } from "playwright";

interface KworbRow {
	position: string;
	positionChange: string;
	primaryArtist: string;
	primaryArtistId: string;
	title: string;
	trackId: string;
	weeksOnChart: string;
	streams: string;
}

export const getSpotifyTrends = async (chartsUrl: string, itemLimit: number) => {
	/* Spotify's own Charts site requires login (and now reCAPTCHA) to see
	 * anything beyond a generic global sample, so this scrapes kworb.net —
	 * a long-running public mirror of Spotify's regional weekly charts. It
	 * doesn't have a per-country "top artists" chart, so that list is
	 * derived from the unique primary artists in the songs chart below. */
	const browser = await chromium.launch({
		headless: true,
		chromiumSandbox: true,
	});
	const page = await browser.newPage();
	await page.goto(chartsUrl, { waitUntil: "domcontentloaded" });
	await page.waitForSelector("table#spotifyweekly tbody tr", { timeout: 15000 });

	const rows = await page.locator("table#spotifyweekly tbody tr").evaluateAll(
		(trs, itemLimit) => {
			return trs.slice(0, itemLimit).map(tr => {
				const cells = tr.querySelectorAll("td");
				const titleCell = cells[2];
				const links = Array.from(titleCell?.querySelectorAll("a") ?? []);
				const artistLinks = links.filter(a =>
					a.getAttribute("href")?.includes("/artist/")
				);
				const trackLink = links.find(a =>
					a.getAttribute("href")?.includes("/track/")
				);
				const trackIdMatch = trackLink
					?.getAttribute("href")
					?.match(/\/track\/([^/.]+)\.html/);
				const artistIdMatch = artistLinks[0]
					?.getAttribute("href")
					?.match(/\/artist\/([^/.]+)\.html/);

				return {
					position: cells[0]?.textContent?.trim() ?? "",
					positionChange: cells[1]?.textContent?.trim() ?? "",
					primaryArtist: artistLinks[0]?.textContent?.trim() ?? "",
					primaryArtistId: artistIdMatch ? artistIdMatch[1] : "",
					title: trackLink?.textContent?.trim() ?? "",
					trackId: trackIdMatch ? trackIdMatch[1] : "",
					weeksOnChart: cells[3]?.textContent?.trim() ?? "",
					streams: cells[6]?.textContent?.trim() ?? "",
				};
			});
		},
		itemLimit
	);

	await page.close();
	await browser.close();

	const validRows = (rows as KworbRow[]).filter(row => row.title && row.trackId);

	const topSongs = {
		songNames: validRows.map(row => row.title),
		songAuthors: validRows.map(row => row.primaryArtist),
		songsLinks: validRows.map(
			row => `https://open.spotify.com/track/${row.trackId}`
		),
		songPrevPosition: validRows.map(row => row.positionChange),
		songStreak: validRows.map(row => row.weeksOnChart),
		songCount: validRows.map(row => row.streams),
	};

	const seenArtists = new Set<string>();
	const uniqueArtists = validRows
		.filter(row => {
			if (!row.primaryArtist || seenArtists.has(row.primaryArtist)) {
				return false;
			}
			seenArtists.add(row.primaryArtist);
			return true;
		})
		.slice(0, itemLimit);

	const topArtists = {
		artistNames: uniqueArtists.map(row => row.primaryArtist),
		artistStreak: uniqueArtists.map(row => row.weeksOnChart),
		artistPrevPosition: uniqueArtists.map(row => row.positionChange),
		artistLinks: uniqueArtists.map(
			row => `https://open.spotify.com/artist/${row.primaryArtistId}`
		),
	};

	return { topSongs, topArtists };
};
