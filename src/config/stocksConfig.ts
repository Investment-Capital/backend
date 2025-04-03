import Emojis from "../classes/emojis";
import Images from "../classes/images";
import StocksConfig from "../types/config/stocksConfig";

const stocksConfig: StocksConfig = {
  sop: {
    income: 0.1,
    requiredPrestige: 1,
    basePrice: 25,
    volatility: 7.5,
    image: Images.soap,
    emoji: Emojis.soap,
  },
  abc: {
    income: 0.2,
    requiredPrestige: 1,
    basePrice: 50,
    volatility: 7.25,
    image: Images.abacus,
    emoji: Emojis.abacus,
  },
  rbx: {
    income: 0.4,
    requiredPrestige: 1,
    basePrice: 75,
    volatility: 7,
    image: Images.mortarBoard,
    emoji: Emojis.mortarBoard,
  },
  apl: {
    income: 0.6,
    requiredPrestige: 1,
    basePrice: 90,
    volatility: 7,
    image: Images.apple,
    emoji: Emojis.apple,
  },
  nvda: {
    income: 0.8,
    requiredPrestige: 2,
    basePrice: 65,
    volatility: 7.5,
    image: Images.dividers,
    emoji: Emojis.dividers,
  },
  aal: {
    income: 1,
    requiredPrestige: 4,
    basePrice: 100,
    volatility: 7.75,
    image: Images.plane,
    emoji: Emojis.plane,
  },
  goog: {
    income: 1.4,
    requiredPrestige: 6,
    basePrice: 115,
    volatility: 8,
    emoji: Emojis.magnifyingGlass,
    image: Images.magnifyingGlass,
  },
};

export default stocksConfig;
