import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";
import RealEstate from "../../../../enum/realEstate";
import RealEstateUpgrades from "../../../../enum/realEstateUpgrades";
import MarketGraphLengths from "../../../../enum/marketGraphLengths";

export default new SlashCommandBuilder()
  .setName("realestate")
  .setDescription("Manage Real Estate.")
  .addSubcommandGroup((subcommandGroup) => {
    subcommandGroup.setName("sell").setDescription("Sell real estate.");

    Object.values(RealEstate).map((realEstate) =>
      subcommandGroup.addSubcommand((subcommand) =>
        subcommand
          .setName(realEstate)
          .setDescription(`Sell a ${realEstate}.`)
          .addStringOption((option) =>
            option
              .setName("name")
              .setDescription(`The name of the ${realEstate} you want to sell.`)
              .setRequired(true)
              .setAutocomplete(true)
          )
      )
    );

    return subcommandGroup;
  })
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
      .setName("market")
      .setDescription("View the real estate market.")
      .addStringOption((option) =>
        option
          .setName("graph-length")
          .setDescription("Change the graph duration")
          .addChoices(
            ...Object.values(MarketGraphLengths).map((length) => ({
              name: length,
              value: length,
            }))
          )
      )
  )
  .toJSON() satisfies Command["data"];
