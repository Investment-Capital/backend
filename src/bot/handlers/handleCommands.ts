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

    logger.info(
      `${command.guilds ? "Guild" : "Global"} Command /${
        command.data.name
      } has passed threw the handler`
    );
  }

  logger.success(
    `Passed ${cache.commands.length} command(s) threw the handler`
  );

  const rest = new REST({ version: "10" }).setToken(
    process.env.TOKEN as string
  );

  const clientId = getIdBytoken(process.env.TOKEN as string);

  rest.put(Routes.applicationCommands(clientId), {
    body: cache.commands
      .filter((e) => !e.guilds)
      .map((command) => command.data),
  });

  new Set(
    cache.commands
      .filter((guildCommand) => guildCommand.guilds)
      .flatMap((guildCommand) => guildCommand.guilds)
  ).forEach((guild) => {
    rest.put(Routes.applicationGuildCommands(clientId, guild as string), {
      body: cache.commands
        .filter((command) => command.guilds?.includes(guild as string))
        .map((command) => command.data),
    });
  });
}) satisfies Handler;
