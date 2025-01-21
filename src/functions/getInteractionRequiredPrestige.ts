import { ChatInputCommandInteraction } from "discord.js";
import Command from "../types/command";
import Component from "../types/component";

const getInteractionRequiredPrestige = (
  data: Component | Command,
  interaction: ChatInputCommandInteraction
): number => {
  if (typeof data.requiedPrestige == "function")
    return data.requiedPrestige(interaction);
  if (typeof data.requiedPrestige == "number") return data.requiedPrestige;
  if (!data.requiedPrestige) return 1;

  const foundCommand = data.requiedPrestige.commands.find(
    (command) =>
      command.subcommand == interaction.options.getSubcommand() &&
      command.subcommandGroup == interaction.options.getSubcommandGroup()
  );

  if (foundCommand) return foundCommand.requiredPrestige;
  return data.requiedPrestige.default;
};

export default getInteractionRequiredPrestige;
