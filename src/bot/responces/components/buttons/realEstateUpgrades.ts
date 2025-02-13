import { ButtonBuilder, ButtonStyle, User } from "discord.js";
import realEstateUpgradesConfig from "../../../../config/realEstateUpgradesConfig";
import RealEstate from "../../../../types/realEstate";
import capitalizeWords from "../../../../functions/capitalizeWords";

const realEstateUpgradesButtons = (user: User, realEstate: RealEstate) => {
  return Object.entries(realEstateUpgradesConfig)
    .filter(([_, config]) => config.allowedRealEstate.includes(realEstate.type))
    .map(([name, config]) =>
      new ButtonBuilder()
        .setCustomId(`realEstateUpgrade-${user.id}-${name}-${realEstate.name}`)
        .setEmoji(config.emoji)
        .setStyle(ButtonStyle.Success)
        .setLabel(capitalizeWords(name))
        .setDisabled(
          realEstate.upgrades.some((upgrade) => upgrade.type == name) ||
            !realEstate.built
        )
    );
};

export default realEstateUpgradesButtons;
