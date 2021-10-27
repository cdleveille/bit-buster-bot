/* eslint-disable no-unused-vars */

export enum Colors {
	green = "#00e64d",
	red = "#ff6666"
}

export const Commands = {
	help: { prefix: "!help", description: "Show a list of my commands." },
	lights: { prefix: "!lights", description: "Show the status of all lights." },
	light: { prefix: "!light", description: "Turn a light on or off, or adjust the brightness: '!light [id] on/off/[brightness]'" }
};