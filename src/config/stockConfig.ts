import Emojis from "../classes/emojis";
import StocksConfig from "../types/config/stocksConfig";

const stockConfig: StocksConfig = {
  sop: {
    income: 0,
    prestigeRequirement: 1,
    basePrice: 25,
    volatility: 7.5,
    image: "https://em-content.zobj.net/source/twitter/408/soap_1f9fc.png",
    emoji: Emojis.soap,
  },
  abc: {
    income: 1,
    prestigeRequirement: 1,
    basePrice: 50,
    volatility: 7.25,
    image: "https://em-content.zobj.net/source/twitter/408/abacus_1f9ee.png",
    emoji: Emojis.abacus,
  },
  rbx: {
    income: 2,
    prestigeRequirement: 1,
    basePrice: 75,
    volatility: 7,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f393.png",
    emoji: Emojis.mortarBoard,
  },
  apl: {
    income: 4,
    prestigeRequirement: 2,
    basePrice: 100,
    volatility: 7,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f34e.png",
    emoji: Emojis.apple,
  },
  nvda: {
    income: 6,
    prestigeRequirement: 3,
    basePrice: 65,
    volatility: 7.5,
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f5c2-fe0f.png",
    emoji: Emojis.dividers,
  },
  goog: {
    income: 10,
    prestigeRequirement: 8,
    basePrice: 150,
    volatility: 8,
    emoji: Emojis.magnifyingGlass,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f50d.png",
  },
  aal: {
    income: 8,
    prestigeRequirement: 5,
    basePrice: 125,
    volatility: 7.75,
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/2708-fe0f.png",
    emoji: Emojis.plane,
  },
};

export default stockConfig;
