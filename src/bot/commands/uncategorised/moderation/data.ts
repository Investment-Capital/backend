import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";

export default new SlashCommandBuilder()
  .setName("moderation")
  .setDescription("Moderation commands.")
  .toJSON() satisfies Command["data"];
