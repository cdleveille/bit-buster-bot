/* eslint-disable no-unused-vars */

export enum Colors {
	green = "#00e64d",
	red = "#ff6666"
}

export const Commands = {
	help: { prefix: "!help", description: "Show a list of my commands." },
	lights: { prefix: "!lights", description: "Show the status of all lights." },
	light: { prefix: "!light", description: "Turn a light on or off, or adjust the brightness: `!light [id] on/off/[brightness]`" },
	define: { prefix: "!define", description: "Look up the definition of a word: `!light define [word]`" },
	disc: { prefix: "!disc", description: "Show info about a disc golf disc!" },
	copter: { prefix: "!toppilots", description: "Show the top copterjs pilots!" },
	play: { prefix: "!p", description: "Play a song from YouTube!" },
	skip: { prefix: "!skip", description: "Skip the track that is currently playing." },
	queue: { prefix: "!queue", description: "List the track currently playing along with the upcoming tracks in the queue." },
};