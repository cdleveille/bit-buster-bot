import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const config = {
	IS_COMPILED: <boolean>path.extname(__filename).includes("js"),
	IS_PROD: <boolean>(process.env.NODE_ENV == "production" ? true : false),
	BOT_TOKEN: <string>process.env.BOT_TOKEN || undefined,
	PHUE_USERNAME: <string>process.env.PHUE_USERNAME || undefined,
	PHUE_BRIDGE_IP: <string>process.env.PHUE_BRIDGE_IP || undefined
};

if (config.BOT_TOKEN === undefined)
	throw "BOT_TOKEN not specified!";

export default config;