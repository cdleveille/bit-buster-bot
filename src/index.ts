import { Client, Message } from "discord.js";

import * as help from "./commands/help";
import * as phue from "./commands/phue";
import config from "./helpers/config";
import { commandRun, replyWithErrorEmbed } from "./helpers/utility";
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
			case commandRun(msg, Commands.help.prefix):
				help.help(msg);
				break;
			case commandRun(msg, Commands.lights.prefix):
				phue.lights(msg);
				break;
			case commandRun(msg, Commands.light.prefix):
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