import { REST, Routes } from "discord.js";

import * as commands from "@commands";
import { Config } from "@helpers";

export const applicationCommands = Object.values(commands);

export const registerApplicationCommands = async (applicationId: string) => {
	console.log("Registering slash commands...");
	const body = applicationCommands.map(cmd => cmd.definition.toJSON());
	const DiscordApi = new REST({ version: "10" }).setToken(Config.BOT_TOKEN);
	await DiscordApi.put(Routes.applicationCommands(applicationId), { body });
};
