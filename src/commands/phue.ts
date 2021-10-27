import axios, { AxiosResponse } from "axios";
import { Message } from "discord.js";

import config from "../helpers/config";
import { getCommandArgs, replyWithErrorEmbed, replyWithSuccessEmbed } from "../helpers/utility";
import { Commands } from "../types/constants";

export const lights = async (msg: Message): Promise<void> => {
	try {
		let output = "";

		const url: string = `http://${config.PHUE_BRIDGE_IP}/api/${config.PHUE_USERNAME}/lights`;
		const res: AxiosResponse = await axios.get(url);

		const keys: string[] = Object.keys(res.data);
		keys.forEach(key => {
			const light = res.data[key];
			output += `ID: ${key}\n` +
				`Name: ${light.name}\n` +
				`On: ${light.state.on}\n` +
				`Brightness: ${Math.max(Math.round(light.state.bri / 2.54), 1)}%\n\n`;
		});

		replyWithSuccessEmbed(msg, "Lights", output);
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

export const light = async (msg: Message): Promise<void> => {
	try {
		const args: string[] = getCommandArgs(msg, Commands.light.prefix);
		if (args.length < 2) throw Errors.syntax;
		const lightId: string = args[0];
		if (isNaN(parseInt(lightId))) throw "Light id must be an integer!";

		let state: boolean, brightness: number;

		if (args[1].toLowerCase() === "on") {
			state = true;
		} else if (args[1].toLowerCase() == "off") {
			state = false;
		} else {
			brightness = parseInt(args[1]);
			if (isNaN(brightness) || brightness < 1 || brightness > 100) throw Errors.syntax;
			brightness = Math.max(Math.round(brightness * 2.54), 1);
		}

		const url: string = `http://${config.PHUE_BRIDGE_IP}/api/${config.PHUE_USERNAME}/lights/${lightId}/state`;

		if (state !== undefined) {
			return await axios.put(url, {
				on: state
			});
		} else if (brightness !== undefined) {
			return await axios.put(url, {
				on: true,
				bri: brightness
			});
		}
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

/* eslint-disable no-unused-vars */
enum Errors {
	syntax = "Invalid command syntax!\n\nUsage: '!light [id] on/off/[brightness]'\n\nBrightness is on a scale from 1 to 100."
}