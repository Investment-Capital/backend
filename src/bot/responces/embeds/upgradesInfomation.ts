import { EmbedBuilder, User } from "discord.js";
import Investor from "../../../types/investor";
import addDefaults from "./defaults/addDefaults";
import Upgrades from "../../../enum/upgrades";
import upgradesConfig from "../../../config/upgradesConfig";
import getInvestorUpgradeAmount from "../../../functions/getInvestorUpgradeAmount";

const upgradesInfomationEmbed = (user: User, investor: Investor) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Upgrades")
      .setColor("Blue")
      .addFields(
        Object.values(Upgrades).map((upgrade) => {
          const config = upgradesConfig[upgrade];
          const value = getInvestorUpgradeAmount(investor, upgrade);

          return {
            inline: true,
            name: config.name,
            value: config.emoji + " " + config.formatValue(value),
          };
        })
      ),
    user
  );
};

export default upgradesInfomationEmbed;
