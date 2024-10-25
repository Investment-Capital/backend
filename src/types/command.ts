import {
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import Execute from "./execute";
import Cache from "./cache";

type Command = {
  data: Partial<
    | SlashCommandBuilder
    | SlashCommandSubcommandBuilder
    | ContextMenuCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
  >;

  execute: Execute;
  autocomplete?: Execute;
  requiresAccount?: boolean;
  guilds?: string[];
  category?: string;
  disabled?: boolean | ((cache: Cache) => boolean);
  requiedPrestige?: number;

  admin?: boolean;
  owner?: boolean;
};

export default Command;
