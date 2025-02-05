import fs from "fs";
import dotenv from "dotenv";
import Command from "../../types/command";
import { REST, Routes } from "discord.js";
import getIdBytoken from "../../functions/getIdByToken";
import Logger from "../../classes/logger";
import Execute from "../../types/execute";
import Cache from "../../types/cache";
import path from "path";
dotenv.config();

export default (async (cache: Cache) => {
  for (const folder of fs.readdirSync(path.join(__dirname, "../commands"))) {
    for (const file of fs.readdirSync(
      path.join(__dirname, `../commands/${folder}`)
    )) {
      const command: Command = (await import(`../commands/${folder}/${file}`))
        .default;

      if ((command.owner || command.admin) && "description" in command.data)
        command.data.description += ` [${
          command.owner ? "OWNER" : "ADMIN"
        } ONLY]`;

      if (!command.category) command.category = folder;
      if (!command.requiedPrestige)
        command.requiedPrestige = {
          default: 1,
        };
      if (command.requiresAccount == undefined) command.requiresAccount = true;
      if (!command.owner) command.owner = false;
      if (!command.admin) command.admin = false;

      cache.commands.push(command);

      Logger.info(
        `${command.guilds ? "Guild" : "Global"} Command /${
          command.data.name
        } has passed threw the handler`
      );
    }
  }

  Logger.success(
    `Passed ${cache.commands.length} command(s) threw the handler`
  );

  const rest = new REST({ version: "10" }).setToken(
    process.env.TOKEN as string
  );

  const clientId = getIdBytoken(process.env.TOKEN as string);

  rest.put(Routes.applicationCommands(clientId), {
    body: cache.commands
      .filter((command) => !command.guilds)
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
}) satisfies Execute;
