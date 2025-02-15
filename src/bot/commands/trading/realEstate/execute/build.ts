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
import RealEstate from "../../../../../enum/realEstate";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import editInvestor from "../../../../../functions/editInvestor";
import buildingStartedConstructionEmbed from "../../../../responces/embeds/buildingStartedConstruction";
import realEstateViewButton from "../../../../responces/components/buttons/realEstateView";
import marketButton from "../../../../responces/components/buttons/market";
import Markets from "../../../../../enum/markets";
import validName from "../../../../../functions/validName";

export default {
  validateCommand: (_, interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup() == "build"
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

    if (price > investor.cash)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "You don't have enough cash for this.",
              "Not Enough Cash"
            ),
          ],
        },
        { ephemeral: true }
      );

    if (
      investor.realEstate.find(
        (realEstate) => realEstate.name.toLowerCase() == name.toLowerCase()
      )
    )
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "You already have real estate with this name.",
              "Invalid Name"
            ),
          ],
        },
        { ephemeral: true }
      );

    if (!validName(name))
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "This real estate name is not allowed.",
              "Invalid Name"
            ),
          ],
        },
        { ephemeral: true }
      );

    editInvestor(cache, investor, () => {
      investor.realEstate.push({
        name,
        type: realEstateType,
        upgrades: [],
        created: Date.now(),
        built: false,
      });

      investor.cash -= price;
    });

    await deferReply(interaction, {
      embeds: [
        buildingStartedConstructionEmbed(
          interaction.user,
          config.image,
          name,
          config.buildTime + Date.now(),
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
} satisfies Command["execute"][number];
