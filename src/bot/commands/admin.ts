import { SlashCommandBuilder } from "discord.js";
import Command from "../../types/command";

export default {
  data: new SlashCommandBuilder().setName("admin").setDescription("???"),
  guilds: [],
  category: "admin",
  disabled: false,
  requiedPrestige: null,
  execute: () => null,
} satisfies Command;
