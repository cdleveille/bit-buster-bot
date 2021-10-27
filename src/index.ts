import { Client, Message } from "discord.js";

import * as help from "./commands/help";
import * as phue from "./commands/phue";
import config from "./helpers/config";
import { commandMatch, replyWithErrorEmbed } from "./helpers/utility";
import { Activities, Commands } from "./types/constants";

const client: Client = new Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(Activities.chipsChallenge);
});

client.on("message", async (msg: Message) => {
	try {
		if (msg.author.bot) return;

		switch (true) {
			case commandMatch(msg.content, Commands.help.prefix):
				help.help(msg);
				break;
			case commandMatch(msg.content, Commands.lights.prefix):
				phue.lights(msg);
				break;
			case commandMatch(msg.content, Commands.light.prefix):
				phue.light(msg);
				break;
		}

	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
});

client.login(config.BOT_TOKEN).catch(error => {
	console.log(error);
});