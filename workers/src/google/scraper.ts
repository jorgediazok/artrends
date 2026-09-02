import { chromium } from "playwright";

export const getGoogleTrends = async (baseUrl: string, itemLimit: number) => {
	/* Scraping start */
	const browser = await chromium.launch({
		headless: true,
		chromiumSandbox: true,
	});
	const page = await browser.newPage({ locale: "es-AR" });
	await page.goto(`${baseUrl}/trending?geo=AR`, { waitUntil: "domcontentloaded" });

	await page.waitForSelector(".mZ3RIc", { timeout: 15000 });
	await page.waitForTimeout(2000);

	const rowLocator = page.locator("table tbody tr");
	const rowCount = await rowLocator.count();

	/* Titles + search volume (rows render empty/loading placeholders first, so skip those) */
	const trendsTitles: string[] = [];
	const amount: string[] = [];

	for (let i = 0; i < rowCount && trendsTitles.length < itemLimit; i++) {
		const row = rowLocator.nth(i);
		const title = await row
			.locator(".mZ3RIc")
			.innerText()
			.catch(() => "");
		if (!title) continue;

		const volume = await row
			.locator(".qNpYPd")
			.innerText()
			.catch(() => "");

		trendsTitles.push(title);
		amount.push(volume);
	}

	/* Links: the new Google Trends UI has no per-trend URL anymore (row clicks
	 * open a client-side panel, not a page), so we synthesize a Google Search
	 * link for each term instead of leaving it empty. */
	const trendsLinks = trendsTitles.map(
		title => `https://www.google.com/search?q=${encodeURIComponent(title)}`
	);

	await page.close();
	await browser.close();

	return { trendsTitles, trendsLinks, amount };
};
