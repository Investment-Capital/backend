import { StringSelectMenuBuilder } from "discord.js";
import Markets from "../../../../enum/markets";
import marketsConfig from "../../../../config/marketsConfig";
import MarketGraphLengths from "../../../../enum/marketGraphLengths";
import CustomIdManager from "../../../../classes/customIdManager";
import Cache from "../../../../types/cache";

const marketsMenu = (
  cache: Cache,
  currentMarket: Markets,
  graphLength: MarketGraphLengths
) => {
  return new StringSelectMenuBuilder()
    .setCustomId(CustomIdManager.create(cache, { id: "market", graphLength }))
    .setOptions(
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
