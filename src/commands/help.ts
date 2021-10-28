import { Message } from "discord.js";

import { replyWithErrorEmbed, replyWithSuccessEmbed } from "../helpers/utility";
import { Commands } from "../types/constants";

const help = async (msg: Message): Promise<void> => {
	try {
		let output = "";

		for (const cmd of Object.values(Commands)) {
			output += `\`${cmd.prefix}\`\n${cmd.description}\n\n`;
		}

		replyWithSuccessEmbed(msg, "Commands:", output);
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

export default help;