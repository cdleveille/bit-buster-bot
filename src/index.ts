import { Client, Message } from "discord.js";

import help from "./commands/help";
import Config from "./helpers/config";
import { define } from "./commands/define";
import { disc } from "./commands/disc";
import { lights, light } from "./commands/phue";
import { commandMatch, replyWithErrorEmbed } from "./helpers/utility";
import { Commands } from "./types/constants";

const client: Client = new Client();

client.on("ready", () => {
	client.user.setUsername("Bit Buster Bot");
	client.user.setActivity("Chip's Challenge");
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg: Message) => {
	try {
		if (msg.author.bot) return;

		switch (true) {
			case commandMatch(msg.content, Commands.help.prefix):
				help(msg);
				break;
			case commandMatch(msg.content, Commands.lights.prefix):
				lights(msg);
				break;
			case commandMatch(msg.content, Commands.light.prefix):
				light(msg);
				break;
			case commandMatch(msg.content, Commands.define.prefix):
				define(msg);
				break;
			case commandMatch(msg.content, Commands.disc.prefix):
				disc(msg);
				break;
		}
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
});

client.login(Config.BOT_TOKEN).catch(error => {
	console.log(error);
});