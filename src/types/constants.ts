/* eslint-disable no-unused-vars */

import { ICommand } from "../types/abstract";

export enum Colors {
	green = "#00e64d",
	red = "#ff6666"
}

export enum Activities {
	chipsChallenge = "Chip's Challenge"
}

export class Commands {
	static readonly help: ICommand = { prefix: "!help", description: "Show a list of my commands." };
	static readonly lights: ICommand = { prefix: "!lights", description: "Show the status of all lights." };
	static readonly light: ICommand = { prefix: "!light", description: "Turn a light on or off, or adjust the brightness: '!light [id] on/off/[brightness]'" };
}

export const CommandsList: ICommand[] = [
	Commands.help,
	Commands.lights,
	Commands.light
];