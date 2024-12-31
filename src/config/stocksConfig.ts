import Emojis from "../classes/emojis";
import StocksConfig from "../types/config/stocksConfig";

const stocksConfig: StocksConfig = {
  sop: {
    income: 0,
    prestigeRequirement: 1,
    basePrice: 25,
    volatility: 7.5,
    image: "",
    emoji: Emojis.soap,
  },
  abc: {
    income: 1,
    prestigeRequirement: 1,
    basePrice: 50,
    volatility: 7.25,
    image: "",
    emoji: Emojis.abacus,
  },
  rbx: {
    income: 2,
    prestigeRequirement: 1,
    basePrice: 75,
    volatility: 7,
    image: "",
    emoji: Emojis.mortarBoard,
  },
  apl: {
    income: 4,
    prestigeRequirement: 2,
    basePrice: 100,
    volatility: 7,
    image: "",
    emoji: Emojis.apple,
  },
  nvda: {
    income: 6,
    prestigeRequirement: 3,
    basePrice: 65,
    volatility: 7.5,
    image: "",
    emoji: Emojis.dividers,
  },
  goog: {
    income: 10,
    prestigeRequirement: 8,
    basePrice: 150,
    volatility: 8,
    emoji: Emojis.magnifyingGlass,
    image: "",
  },
  aal: {
    income: 8,
    prestigeRequirement: 5,
    basePrice: 125,
    volatility: 7.75,
    image: "",
    emoji: Emojis.plane,
  },
};

export default stocksConfig;
