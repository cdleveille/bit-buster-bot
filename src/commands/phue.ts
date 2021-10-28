import axios from "axios";
import { Message } from "discord.js";

import Config from "../helpers/config";
import { getCommandArgs, replyWithErrorEmbed, replyWithSuccessEmbed } from "../helpers/utility";
import { Commands } from "../types/constants";

export const lights = async (msg: Message): Promise<void> => {
	try {
		if (!isPHueConfigured()) throw Errors.pHueNotConfigured;

		const url = `http://${Config.PHUE_BRIDGE_IP}/api/${Config.PHUE_USERNAME}/lights`;
		const res = await axios.get(url);
		if (res.data[0] && res.data[0].error) throw res.data[0].error.description;

		let output = "";

		Object.keys(res.data).forEach(key => {
			const light = res.data[key];
			output += `ID: ${key}\n` +
				`Name: ${light.name}\n` +
				`State: ${light.state.on ? "ON" : "OFF"}\n` +
				`Brightness: ${Math.max(Math.round(light.state.bri / 2.54), 1)}%\n\n`;
		});

		replyWithSuccessEmbed(msg, "Lights:", output);
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

export const light = async (msg: Message): Promise<void> => {
	try {
		if (!isPHueConfigured()) throw Errors.pHueNotConfigured;

		const args = getCommandArgs(msg, Commands.light.prefix);
		if (args.length < 2) throw Errors.lightSyntax;
		const lightId = args[0];
		if (isNaN(parseInt(lightId))) throw Errors.lightID;

		const stateURL = `http://${Config.PHUE_BRIDGE_IP}/api/${Config.PHUE_USERNAME}/lights/${lightId}/state`;
		let state: boolean, brightness: number;

		if (args[1].toLowerCase() === "on") {
			state = true;
		} else if (args[1].toLowerCase() === "off") {
			state = false;
		} else {
			brightness = parseInt(args[1]);
			if (isNaN(brightness) || brightness < 1 || brightness > 100) throw Errors.lightSyntax;
			return await setLightBrightness(msg, lightId, brightness, stateURL);
		}

		return await setLightState(msg, lightId, state, stateURL);
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

const setLightState = async (msg: Message, lightId: string, state: boolean, url: string): Promise<void> => {
	try {
		const res = await axios.put(url, {
			on: state
		});

		if (res.data[0] && res.data[0].error) throw res.data[0].error.description;
		replyWithSuccessEmbed(msg, "Success", `Light ${lightId} was switched ${state ? "on" : "off"}!`);
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

const setLightBrightness = async (msg: Message, lightId: string, brightnessPct: number, url: string): Promise<void> => {
	try {
		const res = await axios.put(url, {
			on: true,
			bri: Math.round(brightnessPct * 2.54)
		});

		if (res.data[0] && res.data[0].error) throw res.data[0].error.description;
		replyWithSuccessEmbed(msg, "Success", `Light ${lightId} was set to ${brightnessPct}% brightness!`);
	} catch (error) {
		replyWithErrorEmbed(msg, error);
	}
};

const isPHueConfigured = (): boolean => {
	return Config.PHUE_USERNAME !== undefined && Config.PHUE_BRIDGE_IP !== undefined;
};

/* eslint-disable no-unused-vars */
enum Errors {
	lightSyntax = "Invalid command syntax!\n\nUsage: `!light [id] on/off/[brightness]`\n\nBrightness is on a scale from 1 to 100.",
	lightID = "Light ID must be an integer!",
	pHueNotConfigured = "Not configured properly for Philips Hue integration! Please make sure the `PHUE_USERNAME` and `PHUE_BRIDGE_IP` environment variables are both defined."
}