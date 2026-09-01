// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";

import { DISCORD_BOT_TOKEN } from "../config";

export default async function Discord() {
	// Create a new client instance
	const DiscordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

	// Register the ready listener before logging in — the ready event
	// usually fires before login()'s promise resolves, so a listener
	// attached afterwards (as callers used to do) would never run.
	const ready = new Promise<void>(resolve =>
		DiscordClient.once(Events.ClientReady, () => resolve())
	);

	// Log in to Discord with your client's token
	await DiscordClient.login(DISCORD_BOT_TOKEN);
	await ready;

	return DiscordClient;
}
