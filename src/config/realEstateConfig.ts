import Emojis from "../classes/emojis";
import Times from "../classes/times";
import RealEstateConfig from "../types/config/realEstateConfig";

const realEstateConfig: RealEstateConfig = {
  appartment: {
    basePrice: 125_000,
    requiredPrestige: 2,
    volatility: 6,
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3da-fe0f.png",
    emoji: Emojis.abandonedHouse,
    baseRent: 750,
    buildTime: Times.hour * 12,
  },

  house: {
    basePrice: 200_000,
    requiredPrestige: 2,
    volatility: 6.5,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3e0.png",
    emoji: Emojis.house,
    baseRent: 2_000,
    buildTime: Times.day,
  },

  warehouse: {
    basePrice: 325_000,
    requiredPrestige: 3,
    volatility: 6.75,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3e2.png",
    emoji: Emojis.office,
    baseRent: 5_000,
    buildTime: Times.day * 1.5,
  },

  skyscraper: {
    basePrice: 600_000,
    requiredPrestige: 5,
    volatility: 7,
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3d9-fe0f.png",
    emoji: Emojis.cityScape,
    baseRent: 7_500,
    buildTime: Times.day * 3,
  },

  castle: {
    basePrice: 500_000,
    requiredPrestige: 8,
    volatility: 7.25,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3f0.png",
    emoji: Emojis.castle,
    baseRent: 10_000,
    buildTime: Times.day * 2.5,
  },
};

export default realEstateConfig;
