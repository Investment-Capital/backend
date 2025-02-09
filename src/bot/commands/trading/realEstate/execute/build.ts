import { ChatInputCommandInteraction, Interaction } from "discord.js";
import Command from "../../../../../types/command";
import Cache from "../../../../../types/cache";
import Investor from "../../../../../types/investor";
import realEstateConfig from "../../../../../config/realEstateConfig";
import RealEstate from "../../../../../enum/realEstate";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import editInvestor from "../../../../../functions/editInvestor";
import createRealEstate from "../../../../../functions/createRealEstate";
import buildingStartedConstructionEmbed from "../../../../responces/embeds/buildingStartedConstruction";

export default {
  validateCommand: (interaction: Interaction) =>
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

    if (investor.realEstate.find((realEstate) => realEstate.name == name))
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

    editInvestor(cache, investor, () => (investor.cash -= price));
    const realEstate = createRealEstate(cache, investor, name, realEstateType);

    await deferReply(interaction, {
      embeds: [
        buildingStartedConstructionEmbed(
          interaction.user,
          config.image,
          config.buildTime + realEstate.created,
          price
        ),
      ],
    });
  },
} satisfies Command["execute"][number];
