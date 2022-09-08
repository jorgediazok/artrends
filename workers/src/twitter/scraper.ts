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
	const page = await browser.newPage();
	await page.goto(url);

	await page.waitForTimeout(3000);

	/* Titles */
	const trendsTitles = await (
		await page.locator(".trend-card .trend-card__list a").allInnerTexts()
	).slice(0, itemLimit);

	/* Links */
	const linkLocator = await page.locator(".trend-card .trend-card__list a");
	const trendsLinks = await linkLocator.evaluateAll(
		(list, { itemLimit, url }) => {
			return list
				.map(linkElement => `${url}${linkElement.getAttribute("href")}`)
				.slice(0, itemLimit);
		},
		{ url, itemLimit }
	);

	/* Searches */
	const searchCounts = await (
		await page
			.locator(".trend-card .trend-card__list .tweet-count")
			.allInnerTexts()
	).slice(0, itemLimit);

	await browser.close();

	return { trendsTitles, trendsLinks, searchCounts };
};
