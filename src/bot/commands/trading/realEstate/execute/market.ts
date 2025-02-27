import {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import MarketGraphLengths from "../../../../../enum/marketGraphLengths";
import deferReply from "../../../../../functions/deferReply";
import marketEmbed from "../../../../responces/embeds/market";
import marketsMenu from "../../../../responces/components/menus/markets";
import marketGraphLengthsButtons from "../../../../responces/components/buttons/marketGraphLengths";
import Markets from "../../../../../enum/markets";
import CustomIdManager from "../../../../../classes/customIdManager";
import CommandExecute from "../../../../../types/commandExecute";

export default {
  validateCommand: (cache, interaction) =>
    interaction.isStringSelectMenu() || interaction.isButton()
      ? (() => {
          const customId = CustomIdManager.parse(cache, interaction.customId);

          return (
            customId.id == "market" &&
            (interaction.isButton()
              ? customId.market
              : interaction.values[0]) == Markets.realEstate
          );
        })()
      : interaction.isChatInputCommand()
      ? interaction.options.getSubcommand() == "market"
      : false,

  requiresAccount: false,
  execute: async (cache, interaction) => {
    if (
      !interaction.isStringSelectMenu() &&
      !interaction.isButton() &&
      !interaction.isChatInputCommand()
    )
      return;

    const graphLength: MarketGraphLengths = interaction.isChatInputCommand()
      ? interaction.options.getString("graph-length") ??
        Object.values(MarketGraphLengths)[0]
      : CustomIdManager.parse(cache, interaction.customId).graphLength;

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
          marketsMenu(cache, Markets.realEstate, graphLength)
        ),
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          marketGraphLengthsButtons(cache, Markets.realEstate, graphLength)
        ),
      ],
    });
  },
} satisfies CommandExecute;
