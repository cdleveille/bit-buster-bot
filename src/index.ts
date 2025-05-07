import { Client, Events, GatewayIntentBits } from "discord.js";

import { Config, applicationCommands, registerApplicationCommands } from "@helpers";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildVoiceStates
	]
});

client.once(Events.ClientReady, async client => {
	await registerApplicationCommands(client.user.id);
	console.log(`Logged in as ${client.user.displayName}`);
});

client.on(Events.InteractionCreate, async int => {
	try {
		if (!int.isChatInputCommand()) return;
		const command = applicationCommands.find(cmd => cmd.definition.name === int.commandName);
		if (!command) {
			return await int.reply({
				content: "Command not implemented yet! Check back soon.",
				flags: "Ephemeral"
			});
		}
		await command.handler(int);
	} catch (error) {
		console.error(error);
	}
});

await client.login(Config.BOT_TOKEN);
