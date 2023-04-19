import { chromium } from "playwright";

// Utils
import translateTweetsToSpanish from "../utils/translateTweetAmount";

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
		await page
			.locator("div[data-testid='cellInnerDiv'] .r-b88u0q")
			.allInnerTexts()
	).slice(0, itemLimit);

	/* Links */
	const trendsLinks = trendsTitles.map(title => {
		return `https://twitter.com/search?q=${encodeURIComponent(title)}`;
	});

	/* Tweets */
	const tweets = await (
		await page
			.locator("div[data-testid='trend'] > div > div:nth-child(3)")
			.allInnerTexts()
	)
		.slice(0, itemLimit)
		.map(twAmount => translateTweetsToSpanish(twAmount));

	await page.close();
	await browser.close();

	return { trendsTitles, trendsLinks, amount: tweets };
};
