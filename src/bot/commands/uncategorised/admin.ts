import { SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";

export default {
  data: new SlashCommandBuilder().setName("admin").setDescription("???"),
  execute: () => null,
} satisfies Command;
