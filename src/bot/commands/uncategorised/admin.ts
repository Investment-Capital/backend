import { SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";

export default {
  data: new SlashCommandBuilder().setName("admin").setDescription("???"),
  guilds: [],
  disabled: false,
  requiedPrestige: null,
  requiresAccount: true,
  category: "admin",
  execute: () => null,
} satisfies Command;
