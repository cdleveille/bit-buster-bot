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

		replyWithSuccessEmbed(msg, "Lights:", output);
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

export const light = async (msg: Message): Promise<void> => {
	try {
		const args: string[] = getCommandArgs(msg, Commands.light.prefix);
		if (args.length < 2) throw Errors.syntax;
		const lightId: string = args[0];
		if (isNaN(parseInt(lightId))) throw Errors.lightID;

		let state: boolean, brightness: number, brightnessPct: number;

		if (args[1].toLowerCase() === "on") {
			state = true;
		} else if (args[1].toLowerCase() == "off") {
			state = false;
		} else {
			brightnessPct = parseInt(args[1]);
			if (isNaN(brightnessPct) || brightnessPct < 1 || brightnessPct > 100) throw Errors.syntax;
			brightness = Math.max(Math.round(brightnessPct * 2.54), 1);
		}

		if (state !== undefined) return await setLightState(msg, lightId, state);
		if (brightness !== undefined) return await setLightBrightness(msg, lightId, brightness);
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

const setLightState = async (msg: Message, lightId: string, state: boolean): Promise<void> => {
	try {
		const url: string = `http://${config.PHUE_BRIDGE_IP}/api/${config.PHUE_USERNAME}/lights/${lightId}/state`;

		const res: AxiosResponse = await axios.put(url, {
			on: state
		});

		if (res.data[0].error) throw res.data[0].error.description;
		replyWithSuccessEmbed(msg, "Success", `Light ${lightId} was switched ${state ? "on" : "off"}!`);
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

const setLightBrightness = async (msg: Message, lightId: string, brightness: number): Promise<void> => {
	try {
		const url: string = `http://${config.PHUE_BRIDGE_IP}/api/${config.PHUE_USERNAME}/lights/${lightId}/state`;

		const res: AxiosResponse = await axios.put(url, {
			on: true,
			bri: brightness
		});

		if (res.data[0].error) throw res.data[0].error.description;
		replyWithSuccessEmbed(msg, "Success", `Light ${lightId} was set to ${Math.max(Math.round(brightness / 2.54), 1)}% brightness!`);
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

/* eslint-disable no-unused-vars */
enum Errors {
	syntax = "Invalid command syntax!\n\nUsage: '!light [id] on/off/[brightness]'\n\nBrightness is on a scale from 1 to 100.",
	lightID = "Light ID must be an integer!"
}