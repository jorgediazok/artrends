import dotenv from "dotenv";

dotenv.config();

export const GOOGLE_TRENDS_ITEM_LIMIT = parseInt(
	process.env.GOOGLE_TRENDS_ITEM_LIMIT || "0"
);
export const GOOGLE_TRENDS_BASE_URL = process.env.GOOGLE_TRENDS_BASE_URL || "";

export const DATABASE_CONNECTION_URI = process.env.DATABASE_CONNECTION_URI;
