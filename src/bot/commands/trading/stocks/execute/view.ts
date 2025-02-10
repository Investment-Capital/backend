import {
  ActionRowBuilder,
  ButtonBuilder,
  ChatInputCommandInteraction,
  Interaction,
} from "discord.js";
import Command from "../../../../../types/command";
import deferReply from "../../../../../functions/deferReply";
import stocksViewEmbed from "../../../../responces/embeds/stocksView";
import Cache from "../../../../../types/cache";
import Investor from "../../../../../types/investor";
import marketButton from "../../../../responces/components/buttons/market";
import Markets from "../../../../../enum/markets";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommand() == "view"
      : interaction.isButton()
      ? interaction.customId == "stocksView"
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
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          marketButton(Markets.stocks)
        ),
      ],
    }),
} satisfies Command["execute"][number];
