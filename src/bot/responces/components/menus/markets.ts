import { StringSelectMenuBuilder } from "discord.js";
import Markets from "../../../../enum/markets";
import marketsConfig from "../../../../config/marketsConfig";

const marketsMenu = (currentMarket: Markets) => {
  return new StringSelectMenuBuilder().setCustomId("markets").setOptions(
    Object.values(Markets).map((market) => {
      const config = marketsConfig[market];

      return {
        emoji: config.emoji,
        value: market,
        label: config.name,
        default: currentMarket == market,
        description: `View the ${config.name}.`,
      };
    })
  );
};

export default marketsMenu;
