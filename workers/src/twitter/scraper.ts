import { chromium } from "playwright";

export const getTwitterTrendingTopics = async (
	url: string,
	itemLimit: number
) => {
	/* Scraping start */
	const browser = await chromium.launch({
		headless: true,
		chromiumSandbox: false,
	});
	const page = await browser.newPage({
		userAgent:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15",
	});
	/* trends24 keeps polling/loading ads in the background and never reaches
	 * "networkidle", so we wait for the actual content selector instead. */
	await page.goto(url, { waitUntil: "domcontentloaded" });
	await page.waitForSelector(".trend-card__list a.trend-link", { timeout: 15000 });

	/* The page shows a timeline of trend-card columns (one per time bucket);
	 * the first one is the most recent snapshot. */
	const latestList = page.locator(".trend-card__list").first();

	/* Titles */
	const trendsTitles = await (
		await latestList.locator("a.trend-link").allInnerTexts()
	).slice(0, itemLimit);

	/* Links */
	const linkLocator = latestList.locator("a.trend-link");
	const trendsLinks = await linkLocator.evaluateAll(
		(list, { itemLimit }) => {
			return list
				.map(linkElement => `${linkElement.getAttribute("href")}`)
				.slice(0, itemLimit);
		},
		{ itemLimit }
	);

	/* Tweet counts: trends24 moved this behind a paid "Archive" subscription,
	 * so this now comes back empty most of the time. */
	const tweets = await (
		await latestList.locator(".tweet-count").allInnerTexts()
	)
		.slice(0, itemLimit)
		.map(tweet => tweet.replace("K", " mil"));

	await page.close();
	await browser.close();

	return { trendsTitles, trendsLinks, amount: tweets };
};
