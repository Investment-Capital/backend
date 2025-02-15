import { ButtonBuilder, ButtonStyle } from "discord.js";
import Markets from "../../../../enum/markets";
import marketsConfig from "../../../../config/marketsConfig";
import MarketGraphLengths from "../../../../enum/marketGraphLengths";
import CustomIdManager from "../../../../classes/customIdManager";
import Cache from "../../../../types/cache";

const marketButton = (cache: Cache, market: Markets) => {
  const config = marketsConfig[market];

  return new ButtonBuilder()
    .setCustomId(
      CustomIdManager.create(cache, {
        id: "market",
        market,
        graphLength: Object.values(MarketGraphLengths)[0],
      })
    )
    .setStyle(ButtonStyle.Primary)
    .setLabel(config.name)
    .setEmoji(config.emoji);
};

export default marketButton;
