import CommandExecute from "../../../../../types/commandExecute";

export default {
  validateCommand: (_, interaction) =>
    interaction.isChatInputCommand() &&
    interaction.options.getSubcommandGroup() == "buy",
  execute: (_, __, ___) => {},
} satisfies CommandExecute;
