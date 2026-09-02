import dotenv from "dotenv";
dotenv.config();

export const DATABASE_CONNECTION_URI =
	process.env.DATABASE_CONNECTION_URI || "";
export const TRENDS_ITEM_LIMIT = parseInt(process.env.TRENDS_ITEM_LIMIT || "0");
export const GOOGLE_TRENDS_BASE_URL = process.env.GOOGLE_TRENDS_BASE_URL || "";
export const TWITTER_TRENDS_URL = process.env.TWITTER_TRENDS_URL || "";
export const SPOTIFY_TRENDS_STARTING_URL =
	process.env.SPOTIFY_TRENDS_STARTING_URL || "";
export const SPOTIFY_TOP_PODCASTS_URL =
	process.env.SPOTIFY_TOP_PODCASTS_URL || "";
export const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "";
export const PORTAL_EL_DESTAPE_URL = process.env.PORTAL_EL_DESTAPE_URL || "";
export const PORTAL_INFOBAE_URL = process.env.PORTAL_INFOBAE_URL || "";
export const PORTAL_TN_URL = process.env.PORTAL_TN_URL || "";
export const PORTAL_CLARIN_URL = process.env.PORTAL_CLARIN_URL || "";
export const PORTAL_LA_NACION_URL = process.env.PORTAL_LA_NACION_URL || "";
