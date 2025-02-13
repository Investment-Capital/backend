import { AutocompleteInteraction } from "discord.js";
import Command from "../../../../types/command";
import Investor from "../../../../types/investor";
import realEstateUpgradesConfig from "../../../../config/realEstateUpgradesConfig";
import searchItems from "../../../../functions/searchItems";
import RealEstateUpgrades from "../../../../enum/realEstateUpgrades";
import realEstateConfig from "../../../../config/realEstateConfig";

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
        ? !realEstate.upgrades.some(
            (upgradeData) =>
              upgradeData.type == (subcommand as RealEstateUpgrades)
          ) &&
          realEstateUpgradesConfig[
            subcommand as RealEstateUpgrades
          ].allowedRealEstate.includes(realEstate.type)
        : true) && (subcommand == "view" ? true : realEstate.built)
  );

  await interaction.respond(
    searchItems(search, filteredRealEstate, (data) => data.name).map(
      (realEstate) => ({
        name: realEstateConfig[realEstate.type].emoji + " " + realEstate.name,
        value: realEstate.name,
      })
    )
  );
}) satisfies Command["autocomplete"];
