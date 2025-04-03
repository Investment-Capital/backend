import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";
import RealEstate from "../../../../enum/realEstate";
import RealEstateUpgrades from "../../../../enum/realEstateUpgrades";

export default [
  new SlashCommandBuilder()
    .setName("realestate")
    .setDescription("Manage Real Estate.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("sell")
        .setDescription("Sell real estate.")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription(`The name of the real estate you want to sell.`)
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("build").setDescription("Build real estate.");

      Object.values(RealEstate).map((realEstate) =>
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(realEstate)
            .setDescription(`Build a ${realEstate}.`)
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription(
                  `The name of the ${realEstate} you want to build.`
                )
                .setRequired(true)
                .setMinLength(2)
                .setMaxLength(50)
            )
        )
      );

      return subcommandGroup;
    })
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("upgrade").setDescription("Upgrade real estate.");

      Object.values(RealEstateUpgrades).map((realEstateUpgrade) =>
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(realEstateUpgrade)
            .setDescription(`Upgrade real estate with ${realEstateUpgrade}.`)
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription(
                  `The name of the real estate you want to upgrade with ${realEstateUpgrade}.`
                )
                .setRequired(true)
                .setAutocomplete(true)
            )
        )
      );

      return subcommandGroup;
    })
    .addSubcommand((subcommand) =>
      subcommand
        .setName("view")
        .setDescription("View your real estate.")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription(`The name of the real estate.`)
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .toJSON(),
] satisfies Command["data"];
