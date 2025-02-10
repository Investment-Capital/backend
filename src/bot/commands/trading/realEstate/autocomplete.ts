import { AutocompleteInteraction } from "discord.js";
import Command from "../../../../types/command";
import Investor from "../../../../types/investor";
import realEstateUpgradesConfig from "../../../../config/realEstateUpgradesConfig";
import searchItems from "../../../../functions/searchItems";
import RealEstateUpgrades from "../../../../enum/realEstateUpgrades";

export default (async (
  _,
  investor: Investor,
  interaction: AutocompleteInteraction
) => {
  const subcommandGroup = interaction.options.getSubcommandGroup();
  const subcommand = interaction.options.getSubcommand();
  const search = interaction.options.getFocused();

  const filteredRealEstate = investor.realEstate.filter(
    (realEstate) =>
      (subcommandGroup == "upgrade"
        ? realEstateUpgradesConfig[
            subcommand as RealEstateUpgrades
          ].allowedRealEstate.includes(realEstate.type)
        : true) && (subcommand == "view" ? true : realEstate.built)
  );

  await interaction.respond(
    searchItems(
      search,
      filteredRealEstate.map((realEstate) => realEstate.name)
    ).map((search) => ({ name: search, value: search }))
  );
}) satisfies Command["autocomplete"];
