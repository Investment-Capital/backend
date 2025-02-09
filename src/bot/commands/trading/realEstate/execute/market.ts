import {
  ActionRowBuilder,
  ButtonBuilder,
  Interaction,
  StringSelectMenuBuilder,
} from "discord.js";
import Command from "../../../../../types/command";
import MarketGraphLengths from "../../../../../enum/marketGraphLengths";
import deferReply from "../../../../../functions/deferReply";
import marketEmbed from "../../../../responces/embeds/market";
import Cache from "../../../../../types/cache";
import marketsMenu from "../../../../responces/components/menus/markets";
import marketGraphLengthsButtons from "../../../../responces/components/buttons/marketGraphLengths";
import Markets from "../../../../../enum/markets";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommand() == "market"
      : interaction.isStringSelectMenu()
      ? interaction.customId == "markets" &&
        interaction.values[0] == Markets.realEstate
      : interaction.isButton()
      ? interaction.customId.startsWith(`${Markets.realEstate}-market`)
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
          cache.markets.realEstate,
          cache.marketGraphs.realEstate[graphLength]
        ),
      ],
      components: [
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          marketsMenu(Markets.realEstate)
        ),
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          marketGraphLengthsButtons(Markets.realEstate, graphLength)
        ),
      ],
    });
  },
} satisfies Command["execute"][number];
