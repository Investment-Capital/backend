import { AutocompleteInteraction } from "discord.js";
import Command from "../../../../types/command";
import Investor from "../../../../types/investor";
import realEstateUpgradesConfig from "../../../../config/realEstateUpgradesConfig";
import searchItems from "../../../../functions/searchItems";
import RealEstateUpgrades from "../../../../enum/realEstateUpgrades";
import RealEstate from "../../../../enum/realEstate";

export default (async (
  _,
  investor: Investor,
  interaction: AutocompleteInteraction
) => {
  const subcommandGroup = interaction.options.getSubcommandGroup();
  const subcommand = interaction.options.getSubcommand();
  const search = interaction.options.getFocused();

  if (subcommandGroup == "sell" || subcommandGroup == "upgrade") {
    const userRealEstate = investor.realEstate.filter(
      (realEstate) =>
        (subcommandGroup == "sell"
          ? realEstate.type == (subcommand as RealEstate)
          : realEstateUpgradesConfig[
              subcommand as RealEstateUpgrades
            ].allowedRealEstate.includes(realEstate.type)) && realEstate.built
    );

    await interaction.respond(
      searchItems(
        search,
        userRealEstate.map((realEstate) => realEstate.name)
      ).map((search) => ({ name: search, value: search }))
    );
  }
}) satisfies Command["autocomplete"];
