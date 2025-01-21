import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import RealEstate from "../../../enum/realEstate";
import Cache from "../../../types/cache";
import createRealEstate from "../../../functions/createRealEstate";
import Investor from "../../../types/investor";
import realEstateConfig from "../../../config/realEstateConfig";
import deferReply from "../../../functions/deferReply";
import nameAlreadyUsed from "../../responces/embeds/nameAlreadyUsed";
import buildingStartedConstruction from "../../responces/embeds/buildingStartedConstruction";
import notEnoughCash from "../../responces/embeds/notEnoughCash";
import editInvestor from "../../../functions/editInvestor";

export default {
  data: new SlashCommandBuilder()
    .setName("build")
    .setDescription("Build something")
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("realestate").setDescription("Build real estate");

      Object.values(RealEstate).forEach((realEstate) => {
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(realEstate)
            .setDescription(`Build a ${realEstate}`)
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription(`Name of the ${realEstate}`)
                .setRequired(true)
            )
        );
      });

      return subcommandGroup;
    })
    .toJSON(),
  execute: async (
    cache: Cache,
    investor: Investor,
    interaction: ChatInputCommandInteraction
  ) => {
    const subcommandGroup = interaction.options.getSubcommandGroup();

    if (subcommandGroup == "realestate") {
      const type = interaction.options.getSubcommand() as RealEstate;
      const name = interaction.options.getString("name", true);
      const config = realEstateConfig[type];
      const price = cache.markets.realEstate[type].price;

      if (price > investor.cash)
        return await deferReply(
          interaction,
          {
            embeds: [notEnoughCash(interaction.user)],
          },
          { ephemeral: true }
        );

      if (investor.realEstate.find((realEstate) => realEstate.name == name))
        return await deferReply(
          interaction,
          {
            embeds: [nameAlreadyUsed(interaction.user)],
          },
          { ephemeral: true }
        );

      editInvestor(cache, investor, () => (investor.cash -= price));
      const realEstate = createRealEstate(cache, investor, name, type);

      await deferReply(interaction, {
        embeds: [
          buildingStartedConstruction(
            interaction.user,
            config.image,
            realEstateConfig[type].buildTime + realEstate.created,
            price
          ),
        ],
      });
    }
  },
  requiedPrestige: {
    default: 1,
    commands: Object.values(RealEstate).map((realEstate) => {
      const config = realEstateConfig[realEstate];
      return {
        requiredPrestige: config.requiredPrestige,
        subcommand: realEstate,
        subcommandGroup: "realestate",
      };
    }),
  },
  requiresAccount: true,
} satisfies Command;
