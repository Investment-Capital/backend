import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";

export default [
  new SlashCommandBuilder()
    .setName("upgrades")
    .setDescription("View your total upgrade amounts.")
    .toJSON(),
] satisfies Command["data"];
