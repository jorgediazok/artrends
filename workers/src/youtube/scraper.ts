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
	await page.goto(url);

	await page.waitForTimeout(3000);

	/* Titles */
	const trendsTitles = await (
		await page.locator("#grid-container #video-title").allInnerTexts()
	).slice(0, itemLimit);

	/* Views */
	const views = await (
		await page
			.locator("#grid-container #metadata-line > span:nth-child(odd)")
			.allInnerTexts()
	)
		.slice(0, itemLimit)
		.map(e => e.replace("de vistas", "").replace("vistas", "").trimEnd())
		.map(e => {
			if (e.includes(".")) {
				return e;
			} else {
				return `${e} K`.replace(",", ".");
			}
		});

	/* Video Links */
	const linkLocator = await page.locator("#grid-container #video-title");
	const trendsLinks = await linkLocator.evaluateAll(
		(list, { itemLimit }) => {
			return list
				.map(
					linkElement =>
						`https://www.youtube.com${linkElement.getAttribute("href")}`
				)
				.slice(0, itemLimit);
		},
		{ url, itemLimit }
	);

	/* Channel */
	const channels = await (
		await page
			.locator("#grid-container #metadata #channel-name")
			.allInnerTexts()
	).slice(0, itemLimit);

	/* Channel Link */
	const channelsLinkLocator = await page.locator(
		"#grid-container #metadata #channel-name a"
	);
	const channelsLinks = await channelsLinkLocator.evaluateAll(
		(list, { itemLimit }) => {
			return list
				.map(
					linkElement =>
						`https://www.youtube.com${linkElement.getAttribute("href")}`
				)
				.slice(0, itemLimit);
		},
		{ url, itemLimit }
	);

	await page.close();
	await browser.close();

	return {
		trendsTitles,
		trendsLinks,
		channels,
		channelsLinks,
		amount: views,
	};
};
