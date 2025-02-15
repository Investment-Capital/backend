import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Interaction,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import Command from "../../../../../types/command";
import Cache from "../../../../../types/cache";
import MarketGraphLengths from "../../../../../enum/marketGraphLengths";
import deferReply from "../../../../../functions/deferReply";
import marketEmbed from "../../../../responces/embeds/market";
import marketsMenu from "../../../../responces/components/menus/markets";
import marketGraphLengthsButtons from "../../../../responces/components/buttons/marketGraphLengths";
import Markets from "../../../../../enum/markets";
import CustomIdManager from "../../../../../classes/customIdManager";

export default {
  validateCommand: (cache: Cache, interaction: Interaction) =>
    interaction.isStringSelectMenu() || interaction.isButton()
      ? (() => {
          const customId = CustomIdManager.parse(cache, interaction.customId);

          return (
            customId.id == "market" &&
            (interaction.isButton()
              ? customId.market
              : interaction.values[0]) == Markets.stocks
          );
        })()
      : interaction.isChatInputCommand()
      ? interaction.options.getSubcommand() == "market"
      : false,

  execute: async (
    cache: Cache,
    _,
    interaction:
      | ButtonInteraction
      | ChatInputCommandInteraction
      | StringSelectMenuInteraction
  ) => {
    const graphLength: MarketGraphLengths = interaction.isChatInputCommand()
      ? interaction.options.getString("graph-length")
      : CustomIdManager.parse(cache, interaction.customId).graphLength;

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
          marketsMenu(cache, Markets.stocks, graphLength)
        ),
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          marketGraphLengthsButtons(cache, Markets.stocks, graphLength)
        ),
      ],
    });
  },
} satisfies Command["execute"][number];
