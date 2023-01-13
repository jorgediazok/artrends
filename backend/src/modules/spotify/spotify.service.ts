// Types
import { Db } from "mongodb";
import { TrendRecord } from "../../types/trendsResponseSchema";

interface SpotifyArtistTrends {
	name: string;
	streak: string;
	prevPosition: string;
	link: string;
}

interface SpotifySongTrends {
	name: string;
	author: string;
	streak: string;
	prevPosition: string;
	link: string;
	streams: string;
}

export async function getArtistTrends(db: Db) {
	try {
		const trends = await db
			.collection<TrendRecord<SpotifyArtistTrends>>("spotify.artists")
			.find()
			.limit(2)
			.sort({ "record.date": -1 })
			.toArray();

		if (!trends || !trends.length) {
			return null;
		}

		if (trends.length > 1) {
			const [current, previous] = trends;
			return { current, previous };
		}

		return {
			current: trends,
		};
	} catch (e) {
		console.log({ e });
		return { e };
	}
}

export async function getSongsTrends(db: Db) {
	try {
		const trends = await db
			.collection<TrendRecord<SpotifySongTrends>>("spotify.songs")
			.find()
			.limit(2)
			.sort({ "record.date": -1 })
			.toArray();

		if (!trends || !trends.length) {
			return null;
		}

		if (trends.length > 1) {
			const [current, previous] = trends;
			return { current, previous };
		}

		return {
			current: trends,
		};
	} catch (e) {
		console.log({ e });
		return { e };
	}
}

export async function getPodcastsTrends(db: Db) {
	try {
		const trends = await db
			.collection<TrendRecord<SpotifySongTrends>>("spotify.podcasts")
			.find()
			.limit(2)
			.sort({ "record.date": -1 })
			.toArray();

		if (!trends || !trends.length) {
			return null;
		}

		if (trends.length > 1) {
			const [current, previous] = trends;
			return { current, previous };
		}

		return {
			current: trends,
		};
	} catch (e) {
		console.log({ e });
		return { e };
	}
}
