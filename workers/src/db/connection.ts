/* Config */
import { DATABASE_CONNECTION_URI } from "../config";

import { Db, MongoClient } from "mongodb";

export const connection = async (): Promise<Db> => {
	const mongoClient = await MongoClient.connect(DATABASE_CONNECTION_URI);
	const db = mongoClient.db("artrends");

	process.on("SIGINT", function () {
		mongoClient.close();
		process.exit(0);
	});

	return db;
};
