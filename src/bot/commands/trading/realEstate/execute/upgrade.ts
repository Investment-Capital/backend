import { ChatInputCommandInteraction, Interaction } from "discord.js";
import Command from "../../../../../types/command";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup() == "upgrade"
      : interaction.isButton()
      ? interaction.customId.startsWith("realEstateUpgrade-")
      : false,
  execute: (_, __, interaction: ChatInputCommandInteraction) =>
    interaction.reply("Comming Soon!"),
} satisfies Command["execute"][number];
