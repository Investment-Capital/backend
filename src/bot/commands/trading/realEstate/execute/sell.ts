import { ChatInputCommandInteraction, Interaction } from "discord.js";
import Command from "../../../../../types/command";
import Cache from "../../../../../types/cache";
import Investor from "../../../../../types/investor";
import RealEstate from "../../../../../enum/realEstate";
import realEstateConfig from "../../../../../config/realEstateConfig";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import DateFormats from "../../../../../enum/dateFormats";
import MarkdownManager from "../../../../../classes/markdownManager";
import editInvestor from "../../../../../functions/editInvestor";
import buildingSoldEmbed from "../../../../responces/embeds/buildingSold";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup() == "sell"
      : false,
  execute: async (
    cache: Cache,
    investor: Investor,
    interaction: ChatInputCommandInteraction
  ) => {
    const realEstateType = interaction.options.getSubcommand() as RealEstate;
    const name = interaction.options.getString("name", true);
    const config = realEstateConfig[realEstateType];
    const price = cache.markets.realEstate[realEstateType].price;

    const realEstate = investor.realEstate.find(
      (realEstate) =>
        realEstate.type == realEstateType && realEstate.name == name
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
          realEstateType,
          price
        ),
      ],
    });
  },
} satisfies Command["execute"][number];
