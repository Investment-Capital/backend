import dotenv from "dotenv";
import fs from "fs";
import Cache from "../types/cache";
import Logger from "../classes/logger";
import path from "path";
dotenv.config();

const startBot = async (cache: Cache) => {
  Logger.info("Starting Bot");

  for (const file of fs.readdirSync(path.join(__dirname, "./handlers"))) {
    const handler = (await import(`./handlers/${file}`)).default;
    handler(cache);
  }

  cache.client.login(process.env.TOKEN);
};

export default startBot;
