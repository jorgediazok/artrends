import { MongoClient, WithId } from "mongodb";

// Types
import { TrendRecord } from "../../types/trendsResponseSchema";

/* Environment variables */
import { DATABASE_CONNECTION_URI } from "../../config";

interface PortalTrends {
	link: string;
	title: string;
}

export async function getPortalTrends() {
	try {
		const client = new MongoClient(DATABASE_CONNECTION_URI);
		const trends: {
			current: Record<string, WithId<TrendRecord<PortalTrends>>>;
			previous: Record<string, WithId<TrendRecord<PortalTrends>>>;
		} = {
			current: {},
			previous: {},
		};

		const elDestapeTrends = await client
			.db("artrends")
			.collection<TrendRecord<PortalTrends>>("portal.elDestape")
			.find()
			.limit(2)
			.sort({ "record.date": -1 })
			.toArray();

		if (elDestapeTrends?.length > 0) {
			if (elDestapeTrends.length > 1) {
				const [current, previous] = elDestapeTrends;
				trends.current.elDestape = current;
				trends.previous.elDestape = previous;
			} else {
				trends.current.elDestape = elDestapeTrends[0];
			}
		}

		const clarinTrends = await client
			.db("artrends")
			.collection<TrendRecord<PortalTrends>>("portal.clarin")
			.find()
			.limit(2)
			.sort({ "record.date": -1 })
			.toArray();

		if (clarinTrends?.length > 0) {
			if (clarinTrends.length > 1) {
				const [current, previous] = clarinTrends;
				trends.current.clarin = current;
				trends.previous.clarin = previous;
			} else {
				trends.current.clarin = clarinTrends[0];
			}
		}

		const infobaeTrends = await client
			.db("artrends")
			.collection<TrendRecord<PortalTrends>>("portal.infobae")
			.find()
			.limit(2)
			.sort({ "record.date": -1 })
			.toArray();

		if (infobaeTrends?.length > 0) {
			if (infobaeTrends.length > 1) {
				const [current, previous] = infobaeTrends;
				trends.current.infobae = current;
				trends.previous.infobae = previous;
			} else {
				trends.current.infobae = infobaeTrends[0];
			}
		}

		const telamTrends = await client
			.db("artrends")
			.collection<TrendRecord<PortalTrends>>("portal.telam")
			.find()
			.limit(2)
			.sort({ "record.date": -1 })
			.toArray();

		if (telamTrends?.length > 0) {
			if (telamTrends.length > 1) {
				const [current, previous] = telamTrends;
				trends.current.telam = current;
				trends.previous.telam = previous;
			} else {
				trends.current.telam = telamTrends[0];
			}
		}

		const laNacionTrends = await client
			.db("artrends")
			.collection<TrendRecord<PortalTrends>>("portal.laNacion")
			.find()
			.limit(2)
			.sort({ "record.date": -1 })
			.toArray();

		if (laNacionTrends?.length > 0) {
			if (laNacionTrends.length > 1) {
				const [current, previous] = laNacionTrends;
				trends.current.laNacion = current;
				trends.previous.laNacion = previous;
			} else {
				trends.current.laNacion = laNacionTrends[0];
			}
		}

		return trends;
	} catch (e) {
		console.log({ e });
		return { e };
	}
}
