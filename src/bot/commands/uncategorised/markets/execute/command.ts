import {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import CustomIdManager from "../../../../../classes/customIdManager";
import MarketGraphLengths from "../../../../../enum/marketGraphLengths";
import Markets from "../../../../../enum/markets";
import deferReply from "../../../../../functions/deferReply";
import CommandExecute from "../../../../../types/commandExecute";
import marketEmbed from "../../../../responces/embeds/market";
import marketsMenu from "../../../../responces/components/menus/markets";
import marketGraphLengthsButtons from "../../../../responces/components/buttons/marketGraphLengths";
import marketsConfig from "../../../../../config/marketsConfig";

export default {
  validateCommand: (cache, interaction) =>
    interaction.isChatInputCommand() ||
    ("customId" in interaction &&
      CustomIdManager.parse(cache, interaction.customId).id == "market"),
  requiresAccount: false,
  execute: async (cache, interaction) => {
    if (
      !interaction.isStringSelectMenu() &&
      !interaction.isButton() &&
      !interaction.isChatInputCommand()
    )
      return;

    const market: Markets = interaction.isChatInputCommand()
      ? Object.values(Markets).find(
          (market) =>
            market.toLowerCase() == interaction.options.getSubcommand()
        )
      : interaction.isButton()
      ? CustomIdManager.parse(cache, interaction.customId).market
      : interaction.values[0];

    const graphLength: MarketGraphLengths = interaction.isChatInputCommand()
      ? interaction.options.getString("graph-length") ??
        Object.values(MarketGraphLengths)[0]
      : CustomIdManager.parse(cache, interaction.customId).graphLength;

    await deferReply(interaction, {
      embeds: [
        marketEmbed(
          interaction.user,
          marketsConfig[market].image,
          cache.markets[market],
          cache.marketGraphs[market][graphLength]
        ),
      ],
      components: [
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          marketsMenu(cache, market, graphLength)
        ),
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          marketGraphLengthsButtons(cache, market, graphLength)
        ),
      ],
    });
  },
} satisfies CommandExecute;
