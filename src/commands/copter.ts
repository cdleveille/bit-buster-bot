import axios from "axios";
import { Message, MessageEmbed } from "discord.js";
import { replyWithErrorEmbed } from "../helpers/utility";

const URL = "https://copterjs.herokuapp.com";

export const copter = async (msg: Message): Promise<void> => {
	axios.get(`${URL}/top10`).then(r => {
		const card: MessageEmbed = new MessageEmbed()
			.setColor("#1bb0a2")
			.setTitle("CopterJS Leaderboard!")
			.setURL(URL);
		for (let i = 0; i < r.data.data.length; i++) {
			if (i !== 0)
				card.addField(`${i + 1}. ${r.data.data[i].player}`, `${r.data.data[i].score}`);
			else
				card.addField(`${i + 1}. ${r.data.data[i].player} 👑`, `${r.data.data[i].score}`);
		}
		msg.channel.send(card);
	}).catch((e: Error) => {
		replyWithErrorEmbed(msg, e);
	});
};