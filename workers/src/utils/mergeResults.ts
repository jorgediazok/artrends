import zipWith from "lodash.zipwith";

import type {
	SpotifySongData,
	SpotifyArtistData,
	TrendsData,
} from "../typings";

/* Normalized schema for Twitter and Google */
export function mergeTrendsResults(
	trendsTitles: string[],
	trendsLinks: string[],
	amount: string[]
): TrendsData[] {
	return zipWith(trendsTitles, trendsLinks, amount, (title, link, amount) => {
		return {
			title,
			link,
			amount,
		};
	});
}

/* Normalized schema for Spotify Artists */
export function mergeSpotifyArtistResults(
	artistNames: string[],
	artistStreak: string[],
	artistPrevPosition: string[],
	artistLinks: string[]
): SpotifyArtistData[] {
	return zipWith(
		artistNames,
		artistStreak,
		artistPrevPosition,
		artistLinks,
		(name, streak, prevPosition, link) => {
			return {
				name,
				streak,
				prevPosition,
				link,
			};
		}
	);
}

/* Normalized schema for Spotify Songs */
export function mergeSpotifySongsResults(
	songNames: string[],
	songAuthors: string[],
	songsLinks: string[],
	songPrevPosition: string[],
	songStreak: string[],
	songCount: string[]
): SpotifySongData[] {
	return zipWith(
		songNames,
		songAuthors,
		songsLinks,
		songPrevPosition,
		songStreak,
		songCount,
		(name, author, link, prevPosition, streak, streams) => {
			return {
				name,
				author,
				streak,
				prevPosition,
				link,
				streams,
			};
		}
	);
}
