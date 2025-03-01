import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import realEstateConfig from "../../../../../config/realEstateConfig";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import DateFormats from "../../../../../enum/dateFormats";
import MarkdownManager from "../../../../../classes/markdownManager";
import editInvestor from "../../../../../functions/editInvestor";
import buildingSoldEmbed from "../../../../responces/embeds/buildingSold";
import realEstateViewButton from "../../../../responces/components/buttons/realEstateView";
import marketButton from "../../../../responces/components/buttons/market";
import Markets from "../../../../../enum/markets";
import CommandExecute from "../../../../../types/commandExecute";
import searchItems from "../../../../../functions/searchItems";
import CustomIdManager from "../../../../../classes/customIdManager";

export default {
  validateCommand: (cache, interaction) =>
    interaction.isChatInputCommand() || interaction.isAutocomplete()
      ? interaction.options.getSubcommand() == "sell"
      : interaction.isButton()
      ? CustomIdManager.parse(cache, interaction.customId).id ==
        "realEstateSell"
      : false,

  autocomplete: async (_, investor, interaction) =>
    await interaction.respond(
      searchItems(
        interaction.options.getFocused(),
        investor.realEstate.filter((realEstate) => realEstate.built),
        (realEstate) => realEstate.name
      ).map((realEstate) => ({
        name: realEstateConfig[realEstate.type].emoji + " " + realEstate.name,
        value: realEstate.name,
      }))
    ),

  execute: async (cache, investor, interaction) => {
    if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

    const name = interaction.isChatInputCommand()
      ? interaction.options.getString("name", true)
      : CustomIdManager.parse(cache, interaction.customId).name;
    const realEstate = investor.realEstate.find(
      (realEstate) => realEstate.name == name
    );

    if (!realEstate)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "You don't have this real estate.",
              "Invalid Investment"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    const config = realEstateConfig[realEstate.type];
    const price = cache.markets.realEstate[realEstate.type].price;

    if (!realEstate.built)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              `This real estate hasn't been built yet, try again ${MarkdownManager.date(
                realEstate.created + config.buildTime,
                DateFormats.relative
              )}.`,
              "Not Built"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    editInvestor(cache, investor, (investor) => {
      investor.cash += price;
      investor.realEstate = investor.realEstate.filter(
        (realEstate) => realEstate.name != name
      );
    });

    await deferReply(interaction, {
      embeds: [
        buildingSoldEmbed(
          interaction.user,
          config.image,
          name,
          realEstate.type,
          price
        ),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          realEstateViewButton(cache),
          marketButton(cache, Markets.realEstate)
        ),
      ],
    });
  },
} satisfies CommandExecute;
