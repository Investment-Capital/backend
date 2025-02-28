import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import getInvestorLevel from "../../../functions/getInvestorLevel";
import levelsConfig from "../../../config/levelsConfig";
import formatNumber from "../../../functions/formatNumber";
import upgradesConfig from "../../../config/upgradesConfig";

const levelInfomationEmbed = (user: User, xp: number) => {
  const currentLevel = getInvestorLevel(xp);
  const levelupRewards = levelsConfig[currentLevel + 1].rewards ?? {};

  return addDefaults(
    new EmbedBuilder()
      .setTitle("Level Infomation")
      .setColor("Blue")
      .addFields(
        {
          name: "Current Level",
          value: `${currentLevel} (${formatNumber(xp)}/${formatNumber(
            levelsConfig[currentLevel + 1].xpRequired
          )} Xp)`,
          inline: true,
        },
        {
          name: "Levelup Rewards",
          value:
            (levelupRewards.cash ? `$${levelupRewards.cash} cash\n` : "") +
            (levelupRewards.upgrade
              ? `${
                  upgradesConfig[levelupRewards.upgrade.type].name
                }: +${upgradesConfig[levelupRewards.upgrade.type].formatValue(
                  levelupRewards.upgrade.amount
                )}`
              : ""),
          inline: true,
        }
      ),
    user
  );
};

export default levelInfomationEmbed;
