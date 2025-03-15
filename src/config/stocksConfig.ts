import Emojis from "../classes/emojis";
import StocksConfig from "../types/config/stocksConfig";

const stocksConfig: StocksConfig = {
  sop: {
    income: 0.25,
    requiredPrestige: 1,
    basePrice: 25,
    volatility: 7.5,
    image: "https://em-content.zobj.net/source/twitter/408/soap_1f9fc.png",
    emoji: Emojis.soap,
  },
  abc: {
    income: 0.5,
    requiredPrestige: 1,
    basePrice: 50,
    volatility: 7.25,
    image: "https://em-content.zobj.net/source/twitter/408/abacus_1f9ee.png",
    emoji: Emojis.abacus,
  },
  rbx: {
    income: 1,
    requiredPrestige: 1,
    basePrice: 75,
    volatility: 7,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f393.png",
    emoji: Emojis.mortarBoard,
  },
  apl: {
    income: 1,
    requiredPrestige: 1,
    basePrice: 90,
    volatility: 7,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f34e.png",
    emoji: Emojis.apple,
  },
  nvda: {
    income: 1,
    requiredPrestige: 2,
    basePrice: 65,
    volatility: 7.5,
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f5c2-fe0f.png",
    emoji: Emojis.dividers,
  },
  aal: {
    income: 2,
    requiredPrestige: 4,
    basePrice: 100,
    volatility: 7.75,
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/2708-fe0f.png",
    emoji: Emojis.plane,
  },
  goog: {
    income: 2,
    requiredPrestige: 6,
    basePrice: 115,
    volatility: 8,
    emoji: Emojis.magnifyingGlass,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f50d.png",
  },
};

export default stocksConfig;
