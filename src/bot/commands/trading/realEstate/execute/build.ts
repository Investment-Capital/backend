import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import realEstateConfig from "../../../../../config/realEstateConfig";
import RealEstate from "../../../../../enum/realEstate";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import editInvestor from "../../../../../functions/editInvestor";
import buildingStartedConstructionEmbed from "../../../../responces/embeds/buildingStartedConstruction";
import realEstateViewButton from "../../../../responces/components/buttons/realEstateView";
import marketButton from "../../../../responces/components/buttons/market";
import Markets from "../../../../../enum/markets";
import CommandExecute from "../../../../../types/commandExecute";
import getInvestorUpgradeAmount from "../../../../../functions/getInvestorUpgradeAmount";
import Upgrades from "../../../../../enum/upgrades";

export default {
  validateCommand: (_, interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup() == "build"
      : false,
  requiredPresige: (_, interaction) =>
    interaction.isChatInputCommand()
      ? realEstateConfig[interaction.options.getSubcommand() as RealEstate]
          .requiredPrestige
      : 1,
  execute: async (cache, investor, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const realEstateType = interaction.options.getSubcommand() as RealEstate;
    const name = interaction.options.getString("name", true);
    const config = realEstateConfig[realEstateType];
    const price = cache.markets.realEstate[realEstateType].price;
    const maxRealEstateAmount = getInvestorUpgradeAmount(
      investor,
      Upgrades.realEstateLimit
    );

    if (investor.realEstate.length + 1 > maxRealEstateAmount)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              `You can only own ${maxRealEstateAmount} real estate proporties at one time.`,
              "Limit Reached"
            ),
          ],
        },
        { ephemeral: true }
      );

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
} satisfies CommandExecute;
