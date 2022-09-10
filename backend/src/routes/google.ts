import { FastifyInstance } from "fastify";
import { MongoClient } from "mongodb";

/* Environment variables */
import { DATABASE_CONNECTION_URI } from "../config";

export default function googleRoutes(app: FastifyInstance) {
	return app.get("/google-trends", async () => {
		try {
			const client = new MongoClient(DATABASE_CONNECTION_URI);
			const trends = await client
				.db("artrends")
				.collection("google")
				.find()
				.limit(2)
				.toArray();

			if (trends.length === 2) {
				const [current, previous] = trends;
				return {
					current,
					previous,
				};
			}

			return trends;
		} catch (e) {
			app.log.error(e);
			return [];
		}
	});
}
