import dotenv from "dotenv";
import fs from "fs";
import Cache from "../types/cache";
import Logger from "../classes/logger";
import Execute from "../types/execute";
dotenv.config();

const startBot = async (cache: Cache) => {
  Logger.info("Starting Bot");

  for (const file of fs.readdirSync("src/bot/handlers")) {
    const handler: Execute = (await import(`./handlers/${file}`)).default;
    handler(cache);
  }

  cache.client.login(process.env.TOKEN);
};

export default startBot;
