import { ButtonBuilder, ButtonStyle } from "discord.js";
import MarketGraphLengths from "../../../../enum/marketGraphLengths";
import Markets from "../../../../enum/markets";
import CustomIdManager from "../../../../classes/customIdManager";
import Cache from "../../../../types/cache";

const marketGraphLengthsButtons = (
  cache: Cache,
  market: Markets,
  currentSelected: MarketGraphLengths
) => {
  return Object.values(MarketGraphLengths).map((length) =>
    new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setLabel(length)
      .setDisabled(currentSelected == length)
      .setCustomId(
        CustomIdManager.create(cache, {
          id: "market",
          market,
          graphLength: length,
        })
      )
  );
};

export default marketGraphLengthsButtons;
