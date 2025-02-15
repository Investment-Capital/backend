import { ButtonBuilder, ButtonStyle } from "discord.js";
import realEstateUpgradesConfig from "../../../../config/realEstateUpgradesConfig";
import RealEstate from "../../../../types/realEstate";
import capitalizeWords from "../../../../functions/capitalizeWords";
import Investor from "../../../../types/investor";
import CustomIdManager from "../../../../classes/customIdManager";
import Cache from "../../../../types/cache";

const realEstateUpgradesButtons = (
  cache: Cache,
  investor: Investor,
  realEstate: RealEstate
) => {
  return Object.entries(realEstateUpgradesConfig)
    .filter(([_, config]) => config.allowedRealEstate.includes(realEstate.type))
    .map(([name, config]) =>
      new ButtonBuilder()
        .setCustomId(
          CustomIdManager.create(cache, {
            user: investor.user.id,
            id: "realEstateUpgrade",
            upgrade: name,
            name: realEstate.name,
          })
        )
        .setEmoji(config.emoji)
        .setStyle(ButtonStyle.Success)
        .setLabel(capitalizeWords(name))
        .setDisabled(
          realEstate.upgrades.some((upgrade) => upgrade.type == name) ||
            !realEstate.built ||
            investor.prestige < config.requiredPrestige
        )
    );
};

export default realEstateUpgradesButtons;
