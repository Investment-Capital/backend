import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";

export default new SlashCommandBuilder()
  .setName("portfolio")
  .setDescription("View your or another players portfolio.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user to lookup.")
      .setRequired(false)
  )
  .toJSON() satisfies Command["data"];
