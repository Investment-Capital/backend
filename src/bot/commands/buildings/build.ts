import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import RealEstate from "../../../enum/realEstate";
import Cache from "../../../types/cache";
import createRealEstate from "../../../functions/createRealEstate";
import Investor from "../../../types/investor";
import MarkdownManager from "../../../classes/markdownManager";
import realEstateConfig from "../../../config/realEstateConfig";
import DateFormats from "../../../enum/dateFormats";

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
  execute: (cache: Cache, interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand();
    const investor = cache.investors.find(
      (investor) => investor.user.id == interaction.user.id
    ) as Investor;

    if (subcommand == "estate") {
      const type = interaction.options.getString("type", true) as RealEstate;
      const name = interaction.options.getString("name", true);

      if (investor.realEstate.find((realEstate) => realEstate.name == name))
        return interaction.reply("already built with that name");

      const realEstate = createRealEstate(cache, investor, name, type);

      interaction.reply(
        `name: ${name}\nCompleted in ${MarkdownManager.date(
          realEstateConfig[type].buildTime + realEstate.created,
          DateFormats.relative
        )}`
      );
    }
  },
  requiresAccount: true,
} satisfies Command;
