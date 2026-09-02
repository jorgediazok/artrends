import { chromium } from "playwright";

// Types
import { PortalsData } from "../typings";

// Config
import {
	PORTAL_EL_DESTAPE_URL,
	PORTAL_CLARIN_URL,
	PORTAL_LA_NACION_URL,
	PORTAL_INFOBAE_URL,
	PORTAL_TN_URL,
} from "../config";

export const getPortalsMostRead = async (
	itemLimit: number
): Promise<PortalsData | undefined> => {
	/* Scraping start */
	const browser = await chromium.launch({
		headless: true,
		chromiumSandbox: true,
	});

	try {
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

		await elDestape.close();

		/* Infobae — no longer has a "most read" widget, so we use their
		 * "Tendencias" section feed instead (same article/link shape). */
		const infobae = await browser.newPage();
		await infobae.goto(PORTAL_INFOBAE_URL);

		await infobae.waitForSelector("a.story-card-ctn", { timeout: 15000 });
		await infobae.waitForTimeout(1000);

		const infobaeArticleTitles = await (
			await infobae.locator("a.story-card-ctn h2.story-card-hl").allInnerTexts()
		).slice(0, itemLimit);

		const infobaeLinkLocator = await infobae.locator(
			"a.story-card-ctn[data-mrf-link]"
		);

		const infobaeArticleLinks = await infobaeLinkLocator.evaluateAll(
			(list, { itemLimit }) => {
				return list
					.map(linkElement => linkElement.getAttribute("data-mrf-link") ?? "")
					.slice(0, itemLimit);
			},
			{ itemLimit }
		);

		await infobae.close();

		/* Clarín */
		const clarin = await browser.newPage();
		await clarin.goto(PORTAL_CLARIN_URL);

		await clarin.waitForSelector("#lo-mas-visto-por-suscriptores", {
			timeout: 15000,
		});
		await clarin.waitForTimeout(1000);

		const clarinListLocator = clarin.locator(
			'ul[data-mrf-recirculation^="ContainerLoMasVistoSus"] li.box-items'
		);

		const clarinArticleTitles = await (
			await clarinListLocator.locator("h2").allInnerTexts()
		).slice(0, itemLimit);

		const clarinLinkLocator = clarinListLocator.locator("a[data-mrf-link]");

		const clarinArticleLinks = await clarinLinkLocator.evaluateAll(
			(list, { itemLimit }) => {
				return list
					.map(linkElement => linkElement.getAttribute("data-mrf-link") ?? "")
					.slice(0, itemLimit);
			},
			{ itemLimit }
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
			'[data-module="tema_ranking"] article a'
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

		/* TN — doesn't have a "most read" widget either, but has a "Temas de
		 * hoy" (topics of the day) widget on the homepage, which fits the
		 * same article/link shape and is arguably closer to "trending". The
		 * widget only shows short topic labels (e.g. "Lionel Messi"), not the
		 * actual headline, so we visit each linked article to grab its real
		 * title from the page's <h1>. */
		const tn = await browser.newPage();
		await tn.goto(PORTAL_TN_URL);

		await tn.waitForSelector(".secondary-nav__ul li.dropdown a", {
			timeout: 15000,
		});
		await tn.waitForTimeout(1000);

		const tnLinkLocator = tn.locator(".secondary-nav__ul li.dropdown a");

		const tnArticleLinks = await tnLinkLocator.evaluateAll(
			(list, { itemLimit }) => {
				return list
					.map(linkElement => linkElement.getAttribute("href") ?? "")
					.slice(0, itemLimit);
			},
			{ itemLimit }
		);

		await tn.close();

		const tnArticleTitles: string[] = [];
		for (const link of tnArticleLinks) {
			const article = await browser.newPage();
			try {
				await article.goto(link, { waitUntil: "domcontentloaded", timeout: 15000 });
				const headline = await article.locator("h1").first().innerText();
				tnArticleTitles.push(headline.trim());
			} catch (e) {
				console.log(`[getPortalsMostRead][tn][${link}]:`, e);
				tnArticleTitles.push("");
			} finally {
				await article.close();
			}
		}

		return {
			elDestape: {
				articles: elDestapeArticleTitles,
				links: elDestapeArticleLinks,
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
			tn: {
				articles: tnArticleTitles,
				links: tnArticleLinks,
			},
		};
	} catch (e) {
		console.log(`[getPortalsMostRead][${new Date().toLocaleTimeString()}]:`, e);
	} finally {
		await browser.close();
	}
};
