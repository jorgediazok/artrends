import { chromium } from "playwright";

export const getTwitterTrendingTopics = async (
	url: string,
	itemLimit: number
) => {
	/* Scraping start */
	const browser = await chromium.launch({
		headless: true,
		chromiumSandbox: true,
	});
	const page = await browser.newPage({
		userAgent:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15",
	});
	await page.goto(url);

	await page.waitForTimeout(5000);

	/* Titles */
	const trendsTitles = await (
		await page.locator(".trend-card .trend-card__list a").allInnerTexts()
	).slice(0, itemLimit);

	/* Links */
	const linkLocator = await page.locator(".trend-card .trend-card__list a");
	const trendsLinks = await linkLocator.evaluateAll(
		(list, { itemLimit }) => {
			return list
				.map(linkElement => `${linkElement.getAttribute("href")}`)
				.slice(0, itemLimit);
		},
		{ url, itemLimit }
	);

	/* Searches */
	const tweets = await (
		await page
			.locator(".trend-card .trend-card__list .tweet-count")
			.allInnerTexts()
	)
		.slice(0, itemLimit)
		.map(tweet => tweet.replace("K", " mil"));

	await page.close();
	await browser.close();

	return { trendsTitles, trendsLinks, amount: tweets };
};
