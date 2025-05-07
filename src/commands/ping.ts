import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import type { TSlashCommand } from "@types";

export const ping: TSlashCommand = {
	definition: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Is this thing on?")
		.addStringOption(option =>
			option.setName("reply").setDescription("The reply to send back").setRequired(false)
		),
	handler: async (int: ChatInputCommandInteraction) => {
		const reply = int.options.getString("reply") ?? "pong";
		await int.reply(reply);
	}
};
