import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import deferReply from "../../../../../functions/deferReply";
import stocksViewEmbed from "../../../../responces/embeds/stocksView";
import marketButton from "../../../../responces/components/buttons/market";
import Markets from "../../../../../enum/markets";
import CustomIdManager from "../../../../../classes/customIdManager";
import CommandExecute from "../../../../../types/commandExecute";

export default {
  validateCommand: (cache, interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommand() == "view"
      : interaction.isButton()
      ? CustomIdManager.parse(cache, interaction.customId).id == "stocksView"
      : false,
  execute: async (cache, investor, interaction) =>
    await deferReply(interaction, {
      embeds: [
        stocksViewEmbed(interaction.user, investor, cache.markets.stocks),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          marketButton(cache, Markets.stocks)
        ),
      ],
    }),
} satisfies CommandExecute;
