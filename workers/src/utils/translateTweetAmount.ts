function translateTweetsToSpanish(text: string): string {
	const regex = /(\d+(\.\d+)?)(K|M)?\s(Tweets)/g;
	const translatedText = text.replace(regex, (_, num, dec, unit) => {
		if (unit === "K") {
			return num.replace(".", ",") + "mil Tweets";
		} else if (unit === "M") {
			return num.replace(".", ",") + "millones de Tweets";
		} else {
			return num.replace(",", ".") + " Tweets";
		}
	});
	return translatedText;
}

export default translateTweetsToSpanish;
