const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) throw new Error("Required env var BOT_TOKEN is not set");

export const Config = { BOT_TOKEN };
