// Require the necessary discord.js classes
import { Client, GatewayIntentBits } from "discord.js";

export default async function Discord() {
	const token =
		"***REMOVED_DISCORD_TOKEN***";

	// Create a new client instance
	const DiscordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

	// Log in to Discord with your client's token
	await DiscordClient.login(token);

	return DiscordClient;
}
