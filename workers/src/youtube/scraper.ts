import { chromium } from "playwright";

export const getYoutubeTrendingVideos = async (
	url: string,
	itemLimit: number
) => {
	/* Scraping start */
	const browser = await chromium.launch({
		headless: true,
		chromiumSandbox: true,
	});
	const page = await browser.newPage({ locale: "es-AR" });
	await page.goto(url, { waitUntil: "domcontentloaded" });

	await page.waitForSelector("ytmc-entry-row", { timeout: 15000 });
	await page.waitForTimeout(2000);

	const rowLocator = page.locator("ytmc-entry-row");
	const rowCount = await rowLocator.count();

	const trendsTitles: string[] = [];
	const trendsLinks: string[] = [];
	const channels: string[] = [];
	const channelsLinks: string[] = [];
	const views: string[] = [];

	for (let i = 0; i < rowCount && trendsTitles.length < itemLimit; i++) {
		const row = rowLocator.nth(i);

		const titleEl = row.locator("#entity-title");
		const title = await titleEl
			.innerText()
			.catch(() => "");
		if (!title.trim()) continue;

		/* The video URL isn't a plain <a href> (this is a client-rendered
		 * chart), it's tucked inside a JSON "endpoint" attribute. */
		const endpointAttr = await titleEl.getAttribute("endpoint").catch(() => null);
		let link = "";
		if (endpointAttr) {
			try {
				link = JSON.parse(endpointAttr)?.urlEndpoint?.url ?? "";
			} catch {
				link = "";
			}
		}

		const artist = await row
			.locator(".artistName")
			.first()
			.innerText()
			.catch(() => "");
		const artistName = artist.trim();

		/* Weekly view count: it's the last of 4 "metric" columns rendered per
		 * row (date / yesterday's rank / days on chart / weekly views), in the
		 * same order as the table header. It's present in the DOM even though
		 * the column itself is hidden by default in this chart view. */
		const viewsText = await row
			.locator(".metric")
			.nth(3)
			.innerText()
			.catch(() => "");

		trendsTitles.push(title.trim());
		trendsLinks.push(link);
		channels.push(artistName);
		views.push(viewsText.trim());
		/* The artist's own endpoint is an internal YT Music browse id, not a
		 * real URL, so we synthesize a search link like the Google scraper does. */
		channelsLinks.push(
			artistName
				? `https://www.youtube.com/results?search_query=${encodeURIComponent(
						artistName
				  )}`
				: ""
		);
	}

	await page.close();
	await browser.close();

	return { trendsTitles, trendsLinks, channels, channelsLinks, amount: views };
};
