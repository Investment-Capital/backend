import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import formatNumber from "../../../functions/formatNumber";
import MarkdownManager from "../../../classes/markdownManager";
import DateFormats from "../../../enum/dateFormats";
import RealEstateUpgrades from "../../../enum/realEstateUpgrades";
import capitalizeWords from "../../../functions/capitalizeWords";
import realEstateUpgradesConfig from "../../../config/realEstateUpgradesConfig";

const realEstateUpgradeBoughtEmbed = (
  user: User,
  upgrade: RealEstateUpgrades,
  realEstateName: string,
  completed: number
) => {
  const config = realEstateUpgradesConfig[upgrade];

  return addDefaults(
    new EmbedBuilder()
      .setColor("Green")
      .setTitle("Upgrade Bought")
      .setThumbnail(config.image)
      .addFields(
        {
          name: "Real Estate",
          value: realEstateName,
          inline: true,
        },
        {
          name: "Upgrade",
          value: capitalizeWords(upgrade),
          inline: true,
        },
        {
          name: "Price",
          value: "$" + formatNumber(config.price),
          inline: true,
        },
        {
          name: "Value Multiplier",
          inline: true,
          value: config.valueMultiplier + "x",
        },
        {
          name: "Completed",
          value: MarkdownManager.date(completed, DateFormats.relative),
          inline: true,
        }
      ),
    user
  );
};

export default realEstateUpgradeBoughtEmbed;
