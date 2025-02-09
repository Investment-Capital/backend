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

const safeImport = async (path: string) => {
  try {
    return await import(path);
  } catch {
    return undefined;
  }
};

export default (async (cache: Cache) => {
  for (const folder of fs.readdirSync(path.join(__dirname, "../commands"))) {
    for (const commandFolder of fs.readdirSync(
      path.join(__dirname, `../commands/${folder}`)
    )) {
      const autocomplete: Command["autocomplete"] | undefined = (
        await safeImport(`../commands/${folder}/${commandFolder}/autocomplete`)
      )?.default;
      const config: Command["config"] | undefined = (
        await safeImport(`../commands/${folder}/${commandFolder}/config`)
      )?.default;
      const data: Command["data"] = (
        await import(`../commands/${folder}/${commandFolder}/data`)
      ).default;

      const command: Command = {
        autocomplete,
        config: config ?? {},
        data,
        execute: [],
      };

      for (const executeFile of fs.readdirSync(
        path.join(__dirname, `../commands/${folder}/${commandFolder}/execute`)
      )) {
        const data: Command["execute"][number] = (
          await import(
            `../commands/${folder}/${commandFolder}/execute/${executeFile}`
          )
        ).default;

        command.execute.push(data);
      }

      if (
        (command.config.owner || command.config.admin) &&
        "description" in command.data
      )
        command.data.description += ` [${
          command.config.owner ? "OWNER" : "ADMIN"
        } ONLY]`;

      if (!command.config.category) command.config.category = folder;
      if (!command.config.requiedPrestige)
        command.config.requiedPrestige = {
          default: 1,
        };
      if (command.config.requiresAccount == undefined)
        command.config.requiresAccount = true;
      if (!command.config.owner) command.config.owner = false;
      if (!command.config.admin) command.config.admin = false;

      cache.commands.push(command);

      Logger.info(
        `${command.config.guilds ? "Guild" : "Global"} Command /${
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
      .filter((command) => !command.config.guilds)
      .map((command) => command.data),
  });

  new Set(
    cache.commands
      .filter((guildCommand) => guildCommand.config.guilds)
      .flatMap((guildCommand) => guildCommand.config.guilds)
  ).forEach((guild) => {
    rest.put(Routes.applicationGuildCommands(clientId, guild as string), {
      body: cache.commands
        .filter((command) => command.config.guilds?.includes(guild as string))
        .map((command) => command.data),
    });
  });
}) satisfies Execute;
