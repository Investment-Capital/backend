import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../../../../types/command";

export default [
  new SlashCommandBuilder()
    .setName("portfolio")
    .setDescription("View your or another players portfolio.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to lookup.")
        .setRequired(false)
    )
    .toJSON(),
  new ContextMenuCommandBuilder()
    .setName("Portfolio")
    .setType(ApplicationCommandType.User)
    .toJSON(),
] satisfies Command["data"];
