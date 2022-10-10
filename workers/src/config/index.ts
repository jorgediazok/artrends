import dotenv from "dotenv";

dotenv.config();

export const DATABASE_CONNECTION_URI = process.env.DATABASE_CONNECTION_URI;
export const TRENDS_ITEM_LIMIT = parseInt(process.env.TRENDS_ITEM_LIMIT || "0");
export const GOOGLE_TRENDS_BASE_URL = process.env.GOOGLE_TRENDS_BASE_URL || "";
export const TWITTER_TRENDS_URL = process.env.TWITTER_TRENDS_URL || "";
export const TWITTER_TOKEN = process.env.TWITTER_TOKEN || "";
export const SPOTIFY_TRENDS_STARTING_URL =
	process.env.SPOTIFY_TRENDS_STARTING_URL || "";
export const SPOTIFY_USER_EMAIL = process.env.SPOTIFY_USER_EMAIL || "";
export const SPOTIFY_USER_PASSWORD = process.env.SPOTIFY_USER_PASSWORD || "";
export const SPOTIFY_TOP_PODCASTS_URL =
	process.env.SPOTIFY_TOP_PODCASTS_URL || "";
export const YOUTUBE_TRENDS_URL = process.env.YOUTUBE_TRENDS_URL || "";
