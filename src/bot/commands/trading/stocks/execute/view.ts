import { ChatInputCommandInteraction, Interaction } from "discord.js";
import Command from "../../../../../types/command";
import deferReply from "../../../../../functions/deferReply";
import stocksViewEmbed from "../../../../responces/embeds/stocksView";
import Cache from "../../../../../types/cache";
import Investor from "../../../../../types/investor";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommand() == "view"
      : false,
  execute: async (
    cache: Cache,
    investor: Investor,
    interaction: ChatInputCommandInteraction
  ) =>
    await deferReply(interaction, {
      embeds: [
        stocksViewEmbed(interaction.user, investor, cache.markets.stocks),
      ],
    }),
} satisfies Command["execute"][number];
