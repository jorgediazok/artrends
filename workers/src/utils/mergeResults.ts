import zipWith from "lodash.zipwith";

export default function mergeGoogleResults(
	trendsTitles: string[],
	trendsLinks: string[],
	searchCounts: string[]
) {
	return zipWith(
		trendsTitles,
		trendsLinks,
		searchCounts,
		(title, link, searchCount) => {
			return {
				title,
				link,
				searchCount,
			};
		}
	);
}
