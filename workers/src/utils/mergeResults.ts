import zipWith from "lodash.zipwith";

export default function mergeTrendsResults(
	trendsTitles: string[],
	trendsLinks: string[],
	amount: string[]
) {
	return zipWith(trendsTitles, trendsLinks, amount, (title, link, amount) => {
		return {
			title,
			link,
			amount,
		};
	});
}
