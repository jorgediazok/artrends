import { chromium } from "playwright";

export const getGoogleTrends = async (baseUrl: string, itemLimit: number) => {
	/* Scraping start */
	const browser = await chromium.launch({
		headless: true,
		chromiumSandbox: false,
	});
	const page = await browser.newPage();
	await page.goto(`${baseUrl}/trends/trendingsearches/daily?geo=AR`);

	await page.waitForTimeout(3000);

	/* Titles */
	const trendsTitles = await (
		await page.locator(".title").allInnerTexts()
	).slice(0, itemLimit);

	/* Links */
	const linkLocator = await page.locator(".title a");
	const trendsLinks = await linkLocator.evaluateAll(
		(list, { itemLimit, baseUrl }) => {
			return list
				.map(linkElement => `${baseUrl}${linkElement.getAttribute("href")}`)
				.slice(0, itemLimit);
		},
		{ baseUrl, itemLimit }
	);

	/* Searches */
	const amount = await (
		await page.locator(".search-count-title").allInnerTexts()
	).slice(0, itemLimit);

	await browser.close();

	return { trendsTitles, trendsLinks, amount };
};
