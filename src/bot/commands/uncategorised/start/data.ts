import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";

export default new SlashCommandBuilder()
  .setName("start")
  .setDescription("Start your investment capital account!")
  .toJSON() satisfies Command["data"];
