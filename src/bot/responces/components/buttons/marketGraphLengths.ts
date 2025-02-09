import { ButtonBuilder, ButtonStyle } from "discord.js";
import MarketGraphLengths from "../../../../enum/marketGraphLengths";
import Markets from "../../../../enum/markets";

const marketGraphLengthsButtons = (
  market: Markets,
  currentSelected: MarketGraphLengths
) => {
  return Object.values(MarketGraphLengths).map((length) =>
    new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setLabel(length)
      .setDisabled(currentSelected == length)
      .setCustomId(market + "-" + "market" + "-" + length)
  );
};

export default marketGraphLengthsButtons;
