import realEstateConfig from "../../../../config/realEstateConfig";
import realEstateUpgradesConfig from "../../../../config/realEstateUpgradesConfig";
import RealEstate from "../../../../enum/realEstate";
import RealEstateUpgrades from "../../../../enum/realEstateUpgrades";
import Command from "../../../../types/command";

export default {
  requiedPrestige: {
    commands: [
      ...Object.values(RealEstate).map((realEstate) => {
        const config = realEstateConfig[realEstate];

        return {
          requiredPrestige: config.requiredPrestige,
          subcommand: realEstate,
          subcommandGroup: "build",
        };
      }),
      ...Object.values(RealEstateUpgrades).map((realEstateUpgrade) => {
        const config = realEstateUpgradesConfig[realEstateUpgrade];

        return {
          requiredPrestige: config.requiredPrestige,
          subcommand: realEstateUpgrade,
          subcommandGroup: "upgrade",
        };
      }),
    ],

    default: Math.min(
      ...Object.values(realEstateConfig).map(
        (config) => config.requiredPrestige
      )
    ),
  },
} satisfies Command["config"];
