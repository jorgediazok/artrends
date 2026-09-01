import { describe, expect, it } from "vitest";
import { getTwitterShareText, getWhatsappShareText } from "./shareText";

const knownTrends = [
	"twitter",
	"spotify.artist",
	"spotify.song",
	"spotify.podcast",
	"youtube",
	"google",
	"portals.laNacion",
	"portals.elDestape",
	"portals.clarin",
	"portals.infobae",
	"portals.tn",
];

describe("getWhatsappShareText", () => {
	it.each(knownTrends)("builds a whatsapp link for '%s'", trend => {
		const text = getWhatsappShareText(trend, 2, "Alguna Tendencia");

		expect(text).toContain("https://api.whatsapp.com/send?text=");
		expect(decodeURIComponent(text)).toContain("Alguna Tendencia");
		expect(decodeURIComponent(text)).toContain("puesto N° 3");
	});

	it("returns undefined for a trend that has no configured message", () => {
		expect(getWhatsappShareText("reddit", 0, "Título")).toBeUndefined();
	});

	it("matches the exact copy for the twitter trend", () => {
		const text = getWhatsappShareText("twitter", 0, "Boca Juniors");

		// Only the title and the final artrends.ar link go through
		// encodeURI/encodeURIComponent — the surrounding copy is plain
		// template text, spaces and accents included as-is.
		expect(text).toBe(
			"https://api.whatsapp.com/send?text=En%20este%20momento%20Boca%20Juniors está en el puesto N° 1 en X Argentina. Seguí todas las tendencias en Artrends https%3A%2F%2Fartrends.ar"
		);
	});
});

describe("getTwitterShareText", () => {
	it.each(knownTrends)("builds a twitter intent link for '%s'", trend => {
		const text = getTwitterShareText(trend, 2, "Alguna Tendencia");

		expect(text).toContain("https://twitter.com/intent/tweet?url=artrends.ar");
		expect(decodeURIComponent(text)).toContain("Alguna Tendencia");
		expect(decodeURIComponent(text)).toContain("puesto N° 3");
	});

	it("returns undefined for a trend that has no configured message", () => {
		expect(getTwitterShareText("reddit", 0, "Título")).toBeUndefined();
	});

	it("matches the exact copy for the portals.laNacion trend", () => {
		const text = getTwitterShareText("portals.laNacion", 4, "Un Título");

		// The [ ] brackets are literal template characters here, not encoded
		// — only the title itself goes through encodeURIComponent.
		expect(text).toBe(
			"https://twitter.com/intent/tweet?url=artrends.ar&text=[Un%20T%C3%ADtulo]%20está%20en%20el%20puesto%20N°%205%20de%20lo%20más%20leído%20en%20La%20Nación.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends"
		);
	});
});
