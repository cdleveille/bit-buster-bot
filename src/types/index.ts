import type { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from "discord.js";

export type TSlashCommand = {
	definition: SlashCommandOptionsOnlyBuilder;
	handler: (int: ChatInputCommandInteraction) => Promise<unknown>;
};
