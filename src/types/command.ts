import { ContextMenuCommandBuilder, SlashCommandBuilder } from "discord.js";
import Execute from "./execute";

type Command = {
  data: SlashCommandBuilder | ContextMenuCommandBuilder;
  category: "investment" | "market" | "uncategorized" | "event";
  disabled: boolean | (() => boolean);
  requiedPrestige: number | null;
  execute: Execute;
  autocomplete?: Execute;
};

export default Command;
