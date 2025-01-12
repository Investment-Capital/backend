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

export default {
  data: new SlashCommandBuilder()
    .setName("build")
    .setDescription("Build something")
    .addSubcommandGroup((subcommandGroup) =>
      subcommandGroup
        .setName("real")
        .setDescription("Build real estate")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("estate")
            .setDescription("Build real estate")
            .addStringOption((option) =>
              option
                .setName("type")
                .setDescription("The type of real estate to build")
                .addChoices(
                  ...Object.keys(RealEstate).map((realEstate) => ({
                    name: realEstate,
                    value: realEstate,
                  }))
                )
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription("Name of real estate")
                .setRequired(true)
            )
        )
    )
    .toJSON(),
  execute: async (
    cache: Cache,
    investor: Investor,
    interaction: ChatInputCommandInteraction
  ) => {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand == "estate") {
      const type = interaction.options.getString("type", true) as RealEstate;
      const name = interaction.options.getString("name", true);
      const config = realEstateConfig[type];
      const price = cache.markets.realEstate[type].price;

      if (investor.realEstate.find((realEstate) => realEstate.name == name))
        return await deferReply(
          interaction,
          {
            embeds: [nameAlreadyUsed(interaction.user)],
          },
          { ephemeral: true }
        );

      await interaction.deferReply();

      const realEstate = createRealEstate(cache, investor, name, type);

      await interaction.editReply({
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
  requiresAccount: true,
} satisfies Command;
