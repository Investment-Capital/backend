import {
  ActionRowBuilder,
  ButtonBuilder,
  ChatInputCommandInteraction,
  Interaction,
} from "discord.js";
import Command from "../../../../../types/command";
import Cache from "../../../../../types/cache";
import Investor from "../../../../../types/investor";
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

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommand() == "sell"
      : false,
  execute: async (
    cache: Cache,
    investor: Investor,
    interaction: ChatInputCommandInteraction
  ) => {
    const name = interaction.options.getString("name", true);
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
          realEstateViewButton(),
          marketButton(Markets.realEstate)
        ),
      ],
    });
  },
} satisfies Command["execute"][number];
