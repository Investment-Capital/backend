import { ButtonBuilder, ButtonStyle } from "discord.js";
import Markets from "../../../../enum/markets";
import marketsConfig from "../../../../config/marketsConfig";
import MarketGraphLengths from "../../../../enum/marketGraphLengths";

const marketButton = (market: Markets) => {
  const config = marketsConfig[market];

  return new ButtonBuilder()
    .setCustomId(`${market}-market-${Object.values(MarketGraphLengths)[0]}`)
    .setStyle(ButtonStyle.Primary)
    .setLabel(config.name)
    .setEmoji(config.emoji);
};

export default marketButton;
