import { Message } from "discord.js";

import { replyWithErrorEmbed, replyWithSuccessEmbed } from "../helpers/utility";
import { CommandsList } from "../types/constants";

export const help = async (msg: Message): Promise<void> => {
	try {
		let output = "";
		CommandsList.forEach(cmd => {
			output += `**${cmd.prefix}**\n${cmd.description}\n\n`;
		});

		replyWithSuccessEmbed(msg, "Commands:", output);
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};