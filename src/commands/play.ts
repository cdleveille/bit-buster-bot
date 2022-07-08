import { Message, VoiceConnection } from "discord.js";
import YouTube, { Video } from "youtube-sr";
import ytdl from "ytdl-core";

export class VideoQueue {
	private items: Video[];

	constructor() {
		this.clear();
	}

	public clear() {
		this.items = [];
	}

	public enqueue(video: Video) {
		this.items.push(video);
	}

	public dequeue() {
		this.items.shift();
	}

	public front() {
		return this.items[0];
	}

	public length() {
		return this.items.length;
	}

	public list() {
		return this.items.reduce((acc, video, i) => {
			return acc + (i > 0 ? `${i}. \`${video.title}\`\n` : "");
		}, "");
	}
}

const queue = new VideoQueue();

export const play = async (msg: Message) => {
	const searchTerm = msg.content.split("!p ")[1];
	const [video, playlist] = await Promise.all([fetchFirstVideo(searchTerm), fetchFirstPlaylist(searchTerm)]);
	if (!video && !playlist) throw "no results found";
	const connection = await msg.member.voice.channel.join();

	if (!video) {
		for (const v of playlist) {
			queue.enqueue(v);
		}
	} else queue.enqueue(video);

	if (queue.length() === (video ? 1 : playlist.videoCount)) {
		await playNextVideoInQueue(msg, connection);
	} else {
		await msg.channel.send(`✅ Queued ${video ? "Video" : "Playlist"}:\n\`${video?.title || playlist.title}\`\n\n` + getNowPlayingAndNextUp());
	}
	return;
};

const fetchFirstVideo = (term: string) => {
	const isVideoUrl = isUrl(term) && !term.includes("playlist?list=");
	if (!isVideoUrl) return YouTube.searchOne(term);
	return YouTube.getVideo(term);
};

const fetchFirstPlaylist = (term: string) => {
	const isPlaylistUrl = isUrl(term) && term.includes("playlist?list=");
	if (!isPlaylistUrl) return YouTube.searchOne(term, "playlist");
	return YouTube.getPlaylist(term);
};

const isUrl = (term: string) => {
	return /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\\-]+\?v=|embed\/|v\/)?)([\w\\-]+)(\S+)?$/.test(
		term
	);
};

const playNextVideoInQueue = async (msg: Message, connection: VoiceConnection) => {
	try {
		const video = queue.front();
		const url = `https://www.youtube.com/watch?v=${video.id}`;
		
		const stream = connection.play(ytdl(url, { filter: "audioonly", highWaterMark: 1 << 25 }));
		stream.setVolume(0.2);
		await msg.channel.send(getNowPlayingAndNextUp());
		stream.on("finish", async () => {
			queue.dequeue();
			if (!queue.front()) setTimeout(() => {
				connection.disconnect();
			}, 30000);
			else await playNextVideoInQueue(msg, connection);
		});
	} catch (error) {
		clearVideoQueue();
		throw error;
	}
};

const getNowPlayingAndNextUp = () => {
	let text = `▶️ Now Playing:\n\`${queue.front().title}\`\n\n`;
	if (queue.length() > 1) {
		text += "🎶 Next Up:\n";
		text += queue.list();
	}
	return text;
};

export const clearVideoQueue = () => {
	queue.clear();
};

export const skip = async (msg: Message) => {
	if (!queue.front()) {
		await msg.channel.send("No track is currently playing!");
		return;
	}
	await msg.channel.send("⏭️ Skipping track...");
	const connection = await msg.member.voice.channel.join();
	if (queue.length() === 1) {
		(connection.player as VoiceConnection).dispatcher.end();
		return;
	}
	queue.dequeue();
	await playNextVideoInQueue(msg, connection);
};

export const showQueue = async (msg: Message) => {
	if (queue.length() === 0) {
		await msg.channel.send("No tracks in the queue!");
		return;
	}
	await msg.channel.send(getNowPlayingAndNextUp());
	return;
};