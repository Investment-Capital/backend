import Emojis from "../classes/emojis";
import Times from "../classes/times";
import RealEstateConfig from "../types/config/realEstateConfig";

const realEstateConfig: RealEstateConfig = {
  appartment: {
    basePrice: 75_000,
    requiredPrestige: 2,
    volatility: 6,
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3da-fe0f.png",
    emoji: Emojis.abandonedHouse,
    hourlyRent: 250,
    buildTime: Times.hour * 12,
  },

  house: {
    basePrice: 125_000,
    requiredPrestige: 2,
    volatility: 6.5,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3e0.png",
    emoji: Emojis.house,
    hourlyRent: 1_000,
    buildTime: Times.day,
  },

  warehouse: {
    basePrice: 225_000,
    requiredPrestige: 3,
    volatility: 6.75,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3e2.png",
    emoji: Emojis.office,
    hourlyRent: 2_250,
    buildTime: Times.day * 1.5,
  },

  skyscraper: {
    basePrice: 350_000,
    requiredPrestige: 5,
    volatility: 7,
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3d9-fe0f.png",
    emoji: Emojis.cityScape,
    hourlyRent: 5_000,
    buildTime: Times.day * 3,
  },
};

export default realEstateConfig;
