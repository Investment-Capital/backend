import fs from "fs";
import dotenv from "dotenv";
import Handler from "../../types/handler";
import Command from "../../types/command";
import { REST, Routes } from "discord.js";
import getIdBytoken from "../../functions/getIdByToken";
import logger from "../../classes/logger";
dotenv.config();

export default (async (cache) => {
  for (const file of fs.readdirSync("src/bot/commands")) {
    const command: Command = (await import(`../commands/${file}`)).default;
    cache.commands.push(command);

    logger.info(`Command /${command.data.name} has passed threw the handler`);
  }

  logger.success(
    `Passed ${cache.commands.length} command(s) threw the handler`
  );

  new REST({ version: "10" })
    .setToken(process.env.TOKEN as string)
    .put(
      Routes.applicationCommands(getIdBytoken(process.env.TOKEN as string)),
      {
        body: cache.commands.map((command) => command.data),
      }
    );
}) satisfies Handler;
