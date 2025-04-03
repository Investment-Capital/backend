import Emojis from "../classes/emojis";
import Images from "../classes/images";
import MarketsConfig from "../types/config/marketsConfig";

const marketsConfig: MarketsConfig = {
  stocks: {
    name: "Stocks Market",
    emoji: Emojis.chart,
    image: Images.chart,
  },
  realEstate: {
    name: "Real Estate Market",
    emoji: Emojis.house,
    image: Images.house,
  },
};

export default marketsConfig;
