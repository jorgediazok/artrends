// Require the necessary discord.js classes
import { Client, GatewayIntentBits } from "discord.js";

import { DISCORD_BOT_TOKEN } from "../config";

export default async function Discord() {
	// Create a new client instance
	const DiscordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

	// Log in to Discord with your client's token
	await DiscordClient.login(DISCORD_BOT_TOKEN);

	return DiscordClient;
}
