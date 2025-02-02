import { ApplicationCommand, ApplicationCommandOptionType } from "discord.js";
import Command from "../types/command";

const getUnlockedCommands = (
  prestige: number,
  commands: Command[],
  applicationCommands: ApplicationCommand[]
) => {
  const unlockedCommands: {
    command: string;
    data?: ApplicationCommand;
  }[] = [];

  for (const command of commands) {
    const commandData = applicationCommands.find(
      (data) => data.name == command.data.name
    );
    const defaultRequired = command.requiedPrestige?.default ?? 1;
    const commandOptions =
      command.data.options?.filter(
        (option) =>
          option.type == ApplicationCommandOptionType.Subcommand ||
          option.type == ApplicationCommandOptionType.SubcommandGroup
      ) ?? [];

    if (!commandOptions.length && defaultRequired == prestige)
      unlockedCommands.push({
        data: commandData,
        command: `/${command.data.name}`,
      });

    for (const specificRequirement of command.requiedPrestige?.commands ?? []) {
      if (specificRequirement.requiredPrestige == prestige)
        unlockedCommands.push({
          data: commandData,
          command: `/${command.data.name} ${
            specificRequirement.subcommandGroup
              ? specificRequirement.subcommandGroup + " "
              : ""
          }${specificRequirement.subcommand}`,
        });
    }

    for (const option of commandOptions) {
      if (defaultRequired !== prestige) break;

      if (option.type == ApplicationCommandOptionType.Subcommand) {
        if (
          command.requiedPrestige?.commands?.find(
            (requiredPrestige) => requiredPrestige.subcommand == option.name
          )
        )
          continue;

        unlockedCommands.push({
          data: commandData,
          command: `/${command.data.name} ${option.name}`,
        });
      } else if (option.type == ApplicationCommandOptionType.SubcommandGroup) {
        const subcommands =
          option.options?.filter(
            (option) => option.type == ApplicationCommandOptionType.Subcommand
          ) ?? [];

        for (const subcommand of subcommands) {
          if (
            command.requiedPrestige?.commands?.find(
              (requiredPrestige) =>
                requiredPrestige.subcommand == subcommand.name &&
                requiredPrestige.subcommandGroup == option.name
            )
          )
            continue;

          unlockedCommands.push({
            data: commandData,
            command: `/${command.data.name} ${option.name} ${subcommand.name}`,
          });
        }
      }
    }
  }

  return unlockedCommands;
};

export default getUnlockedCommands;
