import Emojis from "../classes/emojis";
import MarketsConfig from "../types/config/marketsConfig";

const marketsConfig: MarketsConfig = {
  stocks: {
    name: "Stocks Market",
    emoji: Emojis.chart,
  },
  realEstate: {
    name: "Real Estate Market",
    emoji: Emojis.house,
  },
};

export default marketsConfig;
