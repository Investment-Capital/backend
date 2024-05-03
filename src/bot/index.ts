import { Client } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import Cache from "../types/cache";
import Handler from "../types/handler";
import logger from "../classes/logger";
dotenv.config();

const startBot = async (cache: Cache) => {
  logger.info("Starting Bot");

  const client = new Client({ intents: [], shardCount: 1 });

  for (const file of fs.readdirSync("src/bot/handlers")) {
    const handler: Handler = (await import(`./handlers/${file}`)).default;
    handler(cache, client);
  }

  client.login(process.env.TOKEN);
};

export default startBot;
