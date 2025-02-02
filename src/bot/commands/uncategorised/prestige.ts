import { Interaction, SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import Cache from "../../../types/cache";
import Investor from "../../../types/investor";
import deferReply from "../../../functions/deferReply";
import prestigeViewEmbed from "../../responces/embeds/prestigeView";

export default {
  data: new SlashCommandBuilder()
    .setName("prestige")
    .setDescription("View your prestige info.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("view")
        .setDescription("View your rewards for prestiging.")
    )
    .toJSON(),
  execute: async (
    cache: Cache,
    investor: Investor,
    interaction: Interaction
  ) => {
    await deferReply(interaction, {
      embeds: [
        prestigeViewEmbed(
          interaction.user,
          investor.prestige,
          cache.commands,
          cache.client.application?.commands.cache.toJSON() ?? []
        ),
      ],
    });
  },
} satisfies Command;
