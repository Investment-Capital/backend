import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";

export default [
  new SlashCommandBuilder()
    .setName("level")
    .setDescription("View your level infomation.")
    .toJSON(),
] satisfies Command["data"];
