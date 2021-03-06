import { Client, Message, MessageReaction, User } from "discord.js";

import help from "./commands/help";
import Config from "./helpers/config";
import { copter } from "./commands/copter";
import { define } from "./commands/define";
import { disc } from "./commands/disc";
import { lights, light } from "./commands/phue";
import { clearVideoQueue, play, skip, showQueue as queue } from "./commands/play";
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
				await help(msg);
				break;
			case commandMatch(msg.content, Commands.lights.prefix):
				await lights(msg);
				break;
			case commandMatch(msg.content, Commands.light.prefix):
				await light(msg);
				break;
			case commandMatch(msg.content, Commands.define.prefix):
				await define(msg);
				break;
			case commandMatch(msg.content, Commands.disc.prefix):
				await disc(msg);
				break;
			case commandMatch(msg.content, Commands.copter.prefix):
				await copter(msg);
				break;
			case commandMatch(msg.content, Commands.play.prefix):
				await play(msg);
				break;
			case commandMatch(msg.content, Commands.skip.prefix):
				await skip(msg);
				break;
			case commandMatch(msg.content, Commands.queue.prefix):
				await queue(msg);
				break;
		}
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
});

client.on("messageReactionAdd", async (react: MessageReaction, user: User) => {
	try {
		if (react.message.author.bot && client.user.username === react.message.author.username && react.emoji.name === "🖕") {
			await react.message.channel.send(`<@${user.id}> 🖕`);
		}
	} catch (error) {
		console.log(error);
	}
});

client.on("voiceStateUpdate", () => {
	clearVideoQueue();
});

client.login(Config.BOT_TOKEN).catch(error => {
	console.log(error);
});