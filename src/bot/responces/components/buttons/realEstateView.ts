import { ButtonBuilder, ButtonStyle } from "discord.js";
import getRandomIndex from "../../../../functions/getRandomIndex";
import realEstateConfig from "../../../../config/realEstateConfig";
import realEstateUpgradesConfig from "../../../../config/realEstateUpgradesConfig";

const realEstateViewButton = () =>
  new ButtonBuilder()
    .setCustomId("realEstateView")
    .setLabel("Real Estate")
    .setStyle(ButtonStyle.Primary)
    .setEmoji(
      getRandomIndex([
        ...Object.values(realEstateConfig).map((config) => config.emoji),
        ...Object.values(realEstateUpgradesConfig).map(
          (config) => config.emoji
        ),
      ])
    );

export default realEstateViewButton;
