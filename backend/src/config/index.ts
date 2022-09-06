import dotenv from "dotenv";

dotenv.config();

export const DATABASE_CONNECTION_URI =
	process.env.DATABASE_CONNECTION_URI || "";
