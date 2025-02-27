import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";

export default [
  new SlashCommandBuilder()
    .setName("prestige")
    .setDescription("View your prestige info.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("view")
        .setDescription("View your rewards for prestiging.")
    )
    .toJSON(),
] satisfies Command["data"];
