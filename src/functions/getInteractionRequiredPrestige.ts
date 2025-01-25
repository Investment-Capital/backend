import { Interaction } from "discord.js";
import Command from "../types/command";

const getInteractionRequiredPrestige = (
  data: Command,
  interaction: Interaction
): number => {
  const defaultRequirement = data.requiedPrestige?.default ?? 1;
  const isComponent = !interaction.isCommand() && !interaction.isAutocomplete();

  if (data.requiedPrestige?.components && isComponent)
    return data.requiedPrestige.components(interaction) ?? defaultRequirement;

  if (
    data.requiedPrestige?.commands &&
    !isComponent &&
    interaction.isChatInputCommand()
  ) {
    const foundCommand = data.requiedPrestige.commands.find(
      (command) =>
        command.subcommand == interaction.options.getSubcommand() &&
        command.subcommandGroup == interaction.options.getSubcommandGroup()
    );

    if (foundCommand) return foundCommand.requiredPrestige;
  }

  return defaultRequirement;
};

export default getInteractionRequiredPrestige;
