import { Message } from "discord.js";

import { getCommandArgs, replyWithErrorEmbed, replyWithSuccessEmbed } from "../helpers/utility";
import { Dictionary } from "../services/rest";
import { Commands } from "../types/constants";

export const define = async (msg: Message): Promise<void> => {
	try {
		const args = getCommandArgs(msg, Commands.define.prefix);
		if (!args[0]) throw Errors.args;

		const word = args[0];
		const res = await lookUpWord(word);
		if (!res || res.status !== 200) throw Errors.api;

		let output = "";

		res.data.forEach((data: { word: string, phonetic: string, meanings: any[] }) => {
			output += `**${data.word} ${data.phonetic ? "[" + data.phonetic + "]" : ""}**\n`;
			data.meanings.forEach((meaning: { partOfSpeech: string, definitions: any[] }) => {
				output += `*${meaning.partOfSpeech}*\n`;
				meaning.definitions.forEach((def: { definition: string }) => {
					output += `- ${def.definition}\n`;
				});
			});
			output += "\n";
		});

		replyWithSuccessEmbed(msg, word, output);

	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

const lookUpWord = async (word: string): Promise<any> => {
	return Dictionary.LookUpWord(word);
};

/* eslint-disable no-unused-vars */
enum Errors {
	args = "Must provide a word to define: `!define [word]`",
	api = "Unexpected error retrieving definition!"
}