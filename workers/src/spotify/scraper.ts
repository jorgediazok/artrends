import { chromium } from "playwright";

/* Environment variables */
import { SPOTIFY_USER_EMAIL, SPOTIFY_USER_PASSWORD } from "../config";

export const getSpotifyTrends = async (
	intialUrl: string,
	itemLimit: number
) => {
	/* Scraping start */
	const browser = await chromium.launch({
		headless: false,
		chromiumSandbox: false,
	});
	const page = await browser.newPage();
	await page.goto(intialUrl);

	/* Click log-in button */
	await page.locator("a[data-testid='charts-login']").click({ delay: 200 });
	await page.waitForTimeout(3000);

	/* Enter user email */
	const emailInput = await page.locator("#login-username");
	await emailInput.type(SPOTIFY_USER_EMAIL, { delay: 500 });

	/* Enter user password */
	const passwordInput = await page.locator("#login-password");
	await passwordInput.type(SPOTIFY_USER_PASSWORD, { delay: 500 });

	/* Submit login form */
	await page
		.locator("button[data-testid='login-button']")
		.click({ delay: 1000 });

	await page.waitForTimeout(5000);

	/* Go to Weekly top songs in Argentina */
	await page.goto(
		"https://charts.spotify.com/charts/view/regional-ar-weekly/latest"
	);

	await page.waitForTimeout(3000);

	/* Get  Weekly top songs names in Argentina */
	const songNamesElements = await page.locator(
		".styled__StyledTruncatedTitle-sc-135veyd-22"
	);
	const songNames = await (
		await songNamesElements.allInnerTexts()
	).slice(0, itemLimit);

	/* Get  Weekly top songs author names in Argentina */
	const songAuthorElements = await page.locator(
		".Type__TypeElement-goli3j-0.lfGOlT"
	);
	const songAuthors = await (
		await songAuthorElements.allInnerTexts()
	).slice(1, itemLimit + 1);

	/* Get song top songs links  */
	const songLinksElements = await page.locator(
		".styled__Wrapper-sc-135veyd-14 > a"
	);
	const songsLinks = await songLinksElements.evaluateAll(
		(list, { itemLimit }) => {
			return list
				.map(linkElement => linkElement.getAttribute("href"))
				.slice(0, itemLimit);
		},
		{ itemLimit }
	);

	/* Get Weekly top artist prev week position in chart */
	const songPrevPositionElement = await page.locator(
		".TableCell__TableCellElement-sc-1nn7cfv-0:nth-child(5n)"
	);
	const songPrevPosition = await (
		await songPrevPositionElement.allInnerTexts()
	).slice(0, itemLimit);

	/* Get song top songs presence in chart streak */
	const songStreakElement = await page.locator(
		".TableCell__TableCellElement-sc-1nn7cfv-0:nth-child(6n)"
	);
	const songStreak = await (
		await songStreakElement.allInnerTexts()
	).slice(0, itemLimit);

	/* Get song top songs stream count */
	const songCountElement = await page.locator(
		".TableCell__TableCellElement-sc-1nn7cfv-0:nth-child(7n)"
	);
	const songCount = await (
		await songCountElement.allInnerTexts()
	).slice(0, itemLimit);

	/* Go to Weekly top artists in Argentina */
	await page.goto(
		"https://charts.spotify.com/charts/view/artist-ar-weekly/latest"
	);

	await page.waitForTimeout(3000);

	/* Get  Weekly top artists names in Argentina */
	const artistsNamesElements = await page.locator(
		".styled__StyledTruncatedTitle-sc-135veyd-22.kKOJRc"
	);
	const artistNames = await (
		await artistsNamesElements.allInnerTexts()
	).slice(0, itemLimit);

	/* Get Weekly top artist prev week position in chart */
	const artistPrevPositionElement = await page.locator(
		".TableCell__TableCellElement-sc-1nn7cfv-0:nth-child(5n)"
	);
	const artistPrevPosition = await (
		await artistPrevPositionElement.allInnerTexts()
	).slice(0, itemLimit);

	/* Get Weekly top artist weekly presnece in chart streak */
	const artistStreakElement = await page.locator(
		".TableCell__TableCellElement-sc-1nn7cfv-0:nth-child(6n)"
	);
	const artistStreak = await (
		await artistStreakElement.allInnerTexts()
	).slice(0, itemLimit);

	/* Get Weekly top artists links  */
	const artistLinksElements = await page.locator(
		".styled__Wrapper-sc-135veyd-14 > a"
	);
	const artistLinks = await artistLinksElements.evaluateAll(
		(list, { itemLimit }) => {
			return list
				.map(linkElement => linkElement.getAttribute("href"))
				.slice(0, itemLimit);
		},
		{ itemLimit }
	);

	await page.close();

	return {
		topSongs: {
			songNames,
			songAuthors,
			songsLinks,
			songPrevPosition,
			songStreak,
			songCount,
		},
		topArtists: {
			artistNames,
			artistStreak,
			artistPrevPosition,
			artistLinks,
		},
	};
};
