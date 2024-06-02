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
  execute: Execute;
  autocomplete?: Execute;
  requiresAccount?: boolean;
  guilds?: string[];
  category?: string;
  disabled?: boolean | (() => boolean);
  requiedPrestige?: number;
};

export default Command;
