import "dotenv";
import { Client, Message } from "discord.js";

import config from "./helpers/config";
import { replyWithErrorEmbed, replyWithSuccessEmbed } from "./helpers/utility";

const client: Client = new Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity("Chip's Challenge");
});

client.on("message", async (msg: Message) => {
	try {
		if (msg.author.bot) return;
		replyWithSuccessEmbed(msg, "Hello World!", "Blah blah blah...");
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
});

client.login(config.BOT_TOKEN).catch(error => {
	console.log(error);
});
