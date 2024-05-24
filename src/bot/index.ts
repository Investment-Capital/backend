import dotenv from "dotenv";
import fs from "fs";
import Cache from "../types/cache";
import Handler from "../types/handler";
import logger from "../classes/logger";
dotenv.config();

const startBot = async (cache: Cache) => {
  logger.info("Starting Bot");

  for (const file of fs.readdirSync("src/bot/handlers")) {
    const handler: Handler = (await import(`./handlers/${file}`)).default;
    handler(cache);
  }

  cache.client.login(process.env.TOKEN);
};

export default startBot;
