import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const config = {
	IS_COMPILED: <boolean>path.extname(__filename).includes("js"),
	IS_PROD: <boolean>(process.env.NODE_ENV == "production" ? true : false),
	BOT_TOKEN: <string>process.env.BOT_TOKEN || undefined
};

if (config.BOT_TOKEN === undefined)
	throw "BOT_TOKEN not specified!";

export default config;