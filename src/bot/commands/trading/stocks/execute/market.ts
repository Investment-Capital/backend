import {
  ActionRowBuilder,
  ButtonBuilder,
  Interaction,
  StringSelectMenuBuilder,
} from "discord.js";
import Command from "../../../../../types/command";
import Cache from "../../../../../types/cache";
import MarketGraphLengths from "../../../../../enum/marketGraphLengths";
import deferReply from "../../../../../functions/deferReply";
import marketEmbed from "../../../../responces/embeds/market";
import marketsMenu from "../../../../responces/components/menus/markets";
import marketGraphLengthsButtons from "../../../../responces/components/buttons/marketGraphLengths";
import Markets from "../../../../../enum/markets";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommand() == "market"
      : interaction.isStringSelectMenu()
      ? interaction.customId == "markets" &&
        interaction.values[0] == Markets.stocks
      : interaction.isButton()
      ? interaction.customId.startsWith(`${Markets.stocks}-market`)
      : false,
  execute: async (cache: Cache, _, interaction: Interaction) => {
    const graphLength = ((interaction.isChatInputCommand()
      ? interaction.options.getString("graph-length")
      : interaction.isButton()
      ? interaction.customId.split("-")[2]
      : undefined) ?? Object.keys(MarketGraphLengths)[0]) as MarketGraphLengths;

    await deferReply(interaction, {
      embeds: [
        marketEmbed(
          interaction.user,
          cache.markets.stocks,
          cache.marketGraphs.stocks[graphLength]
        ),
      ],
      components: [
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          marketsMenu(Markets.stocks)
        ),
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          marketGraphLengthsButtons(Markets.stocks, graphLength)
        ),
      ],
    });
  },
} satisfies Command["execute"][number];
