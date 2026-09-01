import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "";
export const DATABASE_CONNECTION_URI =
	process.env.DATABASE_CONNECTION_URI || "";
export const REDIS_HOST = process.env.REDISHOST || "";
export const REDIS_PASSWORD = process.env.REDISPASSWORD || "";
export const REDIS_PORT = parseInt(process.env.REDISPORT || "6379", 10);
export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || "";
