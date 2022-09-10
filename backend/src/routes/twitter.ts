import { MongoClient } from "mongodb";

// Types
import { FastifyReply } from "fastify";
import { TrendPayload, TrendRecord } from "../types/trendsResponseSchema";

/* Environment variables */
import { DATABASE_CONNECTION_URI } from "../config";

export default function googleRoutes(app: AppInstance) {
	return app.get(
		"/api/twitter-trends",
		{
			schema: {
				response: {
					default: TrendPayload,
				},
			},
		},
		async (_req, res: FastifyReply) => {
			try {
				const client = new MongoClient(DATABASE_CONNECTION_URI);
				const trends = await client
					.db("artrends")
					.collection<TrendRecord>("twitter")
					.find()
					.limit(2)
					.toArray();

				if (trends.length > 1) {
					const [current, previous] = trends;
					return res.status(200).send({
						current,
						previous,
					});
				}

				return res.status(200).send(trends);
			} catch (e) {
				app.log.error(e);
				return [];
			}
		}
	);
}
