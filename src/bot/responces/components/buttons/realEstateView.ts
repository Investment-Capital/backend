import { ButtonBuilder, ButtonStyle } from "discord.js";
import getRandomIndex from "../../../../functions/getRandomIndex";
import realEstateConfig from "../../../../config/realEstateConfig";
import realEstateUpgradesConfig from "../../../../config/realEstateUpgradesConfig";
import CustomIdManager from "../../../../classes/customIdManager";
import Cache from "../../../../types/cache";

const realEstateViewButton = (cache: Cache) =>
  new ButtonBuilder()
    .setCustomId(
      CustomIdManager.create(cache, {
        id: "realEstateView",
      })
    )
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
