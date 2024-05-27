import {
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import Execute from "./execute";

type Command = {
  data:
    | SlashCommandBuilder
    | SlashCommandSubcommandBuilder
    | ContextMenuCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder;
  disabled: boolean | (() => boolean);
  requiedPrestige: number | null;
  execute: Execute;
  autocomplete?: Execute;
  guilds?: string[];
  category?: string;
};

export default Command;
