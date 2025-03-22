import { EmbedBuilder, User } from "discord.js";
import Investor from "../../../types/investor";
import addDefaults from "./defaults/addDefaults";
import ShopItems from "../../../enum/shopItems";
import shopConfig from "../../../config/shopConfig";
import getShopCost from "../../../functions/getShopCost";
import capitalizeWords from "../../../functions/capitalizeWords";
import Emojis from "../../../classes/emojis";
import formatNumber from "../../../functions/formatNumber";
import upgradesConfig from "../../../config/upgradesConfig";

const shopViewEmbed = (user: User, investor: Investor) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Shop")
      .setColor("Blue")
      .addFields(
        Object.values(ShopItems).map((item) => {
          const config = shopConfig[item];
          const upgradeConfig = upgradesConfig[config.upgrade.type];
          const cost = getShopCost(item, investor.shop[item]);

          return {
            inline: true,
            name:
              config.emoji +
              " " +
              capitalizeWords(item) +
              " " +
              (config.resetOnPrestige ? "[TEMP]" : "[PERM]"),
            value:
              config.requiredPresige > investor.prestige
                ? `${Emojis.lock} Unlocked at prestige ${config.requiredPresige}.`
                : ` Level: ${investor.shop[item]}\nCost: ${formatNumber(
                    cost
                  )}\nReward: +${upgradeConfig.formatValue(
                    config.upgrade.amount
                  )} ${upgradeConfig.name}`,
          };
        })
      ),
    user
  ).setFooter({
    text:
      Emojis.questionMark +
      " Temporary upgrades reset on prestige while permamant upgrades don't",
  });
};

export default shopViewEmbed;
