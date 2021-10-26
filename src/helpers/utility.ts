import { MessageEmbed, Message } from "discord.js";
import { Colors } from "../types/constants";

export const replyWithSuccessEmbed = (msg: Message, title: any, body: any): void => {
	const successEmbed: MessageEmbed = new MessageEmbed();
	successEmbed.setColor(Colors.green).setTitle(title);
	successEmbed.setDescription(body);
	msg.reply(successEmbed);
};

export const replyWithErrorEmbed = (msg: Message, error: any): void => {
	const errorEmbed: MessageEmbed = new MessageEmbed();
	errorEmbed.setColor(Colors.red).setTitle("Error");
	errorEmbed.setDescription(error);
	msg.reply(errorEmbed);
};