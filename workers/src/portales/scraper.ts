import { chromium } from "playwright";

// Types
import { PortalsData } from "../typings";

// Config
import {
	PORTAL_EL_DESTAPE_URL,
	PORTAL_TELAM_URL,
	PORTAL_INFOBAE_URL,
	PORTAL_CLARIN_URL,
	PORTAL_LA_NACION_URL,
} from "../config";

export const getPortalsMostRead = async (
	itemLimit: number
): Promise<PortalsData> => {
	/* Scraping start */
	const browser = await chromium.launch({
		headless: true,
		chromiumSandbox: false,
	});
	const elDestape = await browser.newPage();
	await elDestape.goto(PORTAL_EL_DESTAPE_URL);

	await elDestape.waitForTimeout(8000);

	/* El destape */

	const elDestapeArticleTitles = await (
		await elDestape.locator(".mas_vistas .titulo h2").allInnerTexts()
	).slice(0, itemLimit);

	const elDestapelinkLocator = await elDestape.locator(
		".mas_vistas .titulo h2 a"
	);
	const elDestapeArticleLinks = await elDestapelinkLocator.evaluateAll(
		(list, { itemLimit, PORTAL_EL_DESTAPE_URL }) => {
			return list
				.map(
					linkElement =>
						`${PORTAL_EL_DESTAPE_URL}${linkElement.getAttribute("href")}`
				)
				.slice(0, itemLimit);
		},
		{ PORTAL_EL_DESTAPE_URL, itemLimit }
	);

	/* Telam */

	const telam = await browser.newPage();
	await telam.goto(PORTAL_TELAM_URL);

	await telam.waitForTimeout(3000);
	await telam.mouse.wheel(0, 6000);
	await telam.waitForTimeout(3000);

	const telamArticleTitles = await (
		await telam.locator(".moreread h5").allInnerTexts()
	).slice(0, itemLimit);

	const telamLinkLocator = await telam.locator(".moreread h5 a");

	const telamArticleLinks = await telamLinkLocator.evaluateAll(
		(list, { itemLimit, PORTAL_TELAM_URL }) => {
			return list
				.map(
					linkElement =>
						`${PORTAL_TELAM_URL}${linkElement.getAttribute("href")}`
				)
				.slice(0, itemLimit);
		},
		{ PORTAL_TELAM_URL, itemLimit }
	);

	await telam.close();

	/* Infobae */

	const infobae = await browser.newPage();
	await infobae.goto(PORTAL_INFOBAE_URL);

	await infobae.waitForTimeout(3000);

	const infobaeArticleTitles = await (
		await infobae
			.locator(".most-read-container .most-read-item .most-read-headline")
			.allInnerTexts()
	).slice(0, itemLimit);

	const infobaeLinkLocator = await infobae.locator(
		".most-read-container .most-read-item .headline-link"
	);

	const infobaeArticleLinks = await infobaeLinkLocator.evaluateAll(
		(list, { itemLimit, PORTAL_INFOBAE_URL }) => {
			return list
				.map(
					linkElement =>
						`${PORTAL_INFOBAE_URL}${linkElement.getAttribute("href")}`
				)
				.slice(0, itemLimit);
		},
		{ PORTAL_INFOBAE_URL, itemLimit }
	);

	await infobae.close();

	/* Clarín */

	const clarin = await browser.newPage();
	await clarin.goto(PORTAL_CLARIN_URL);

	await clarin.waitForTimeout(3000);

	const clarinArticleTitles = await (
		await clarin.locator(".The__most__seen .box-container h2").allInnerTexts()
	).slice(0, itemLimit);

	const clarinLinkLocator = await clarin.locator(".The__most__seen article a");

	const clarinArticleLinks = await clarinLinkLocator.evaluateAll(
		(list, { itemLimit, PORTAL_CLARIN_URL }) => {
			return list
				.map(
					linkElement =>
						`${PORTAL_CLARIN_URL}${linkElement.getAttribute("href")}`
				)
				.slice(0, itemLimit);
		},
		{ PORTAL_CLARIN_URL, itemLimit }
	);

	await clarin.close();

	/* La Nación */

	const laNacion = await browser.newPage();
	await laNacion.goto(PORTAL_LA_NACION_URL);

	await laNacion.waitForTimeout(3000);

	const laNacionArticleTitles = await (
		await laNacion
			.locator('[data-module="tema_ranking"] article h2')
			.allInnerTexts()
	).slice(0, itemLimit);

	const laNacionLinkLocator = await laNacion.locator(
		'[data-module="tema_ranking"] article section.mod-description a'
	);

	const laNacionArticleLinks = await laNacionLinkLocator.evaluateAll(
		(list, { itemLimit, PORTAL_LA_NACION_URL }) => {
			return list
				.map(
					linkElement =>
						`${PORTAL_LA_NACION_URL}${linkElement.getAttribute("href")}`
				)
				.slice(0, itemLimit);
		},
		{ PORTAL_LA_NACION_URL, itemLimit }
	);

	await laNacion.close();
	await browser.close();

	return {
		elDestape: {
			articles: elDestapeArticleTitles,
			links: elDestapeArticleLinks,
		},
		telam: {
			articles: telamArticleTitles,
			links: telamArticleLinks,
		},
		infobae: {
			articles: infobaeArticleTitles,
			links: infobaeArticleLinks,
		},
		clarin: {
			articles: clarinArticleTitles,
			links: clarinArticleLinks,
		},
		laNacion: {
			articles: laNacionArticleTitles,
			links: laNacionArticleLinks,
		},
	};
};
