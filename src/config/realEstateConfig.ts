import Emojis from "../classes/emojis";
import Images from "../classes/images";
import Times from "../classes/times";
import RealEstateConfig from "../types/config/realEstateConfig";

const realEstateConfig: RealEstateConfig = {
  appartment: {
    basePrice: 125_000,
    requiredPrestige: 2,
    volatility: 6,
    image: Images.appartment,
    emoji: Emojis.abandonedHouse,
    rent: 750,
    buildTime: Times.hour * 12,
  },

  house: {
    basePrice: 200_000,
    requiredPrestige: 2,
    volatility: 6.5,
    image: Images.house,
    emoji: Emojis.house,
    rent: 2_000,
    buildTime: Times.day,
  },

  warehouse: {
    basePrice: 325_000,
    requiredPrestige: 3,
    volatility: 6.75,
    image: Images.warehouse,
    emoji: Emojis.office,
    rent: 5_000,
    buildTime: Times.day * 1.5,
  },

  skyscraper: {
    basePrice: 600_000,
    requiredPrestige: 5,
    volatility: 7,
    image: Images.skyscraper,
    emoji: Emojis.cityScape,
    rent: 7_500,
    buildTime: Times.day * 3,
  },

  castle: {
    basePrice: 500_000,
    requiredPrestige: 8,
    volatility: 7.25,
    image: Images.castle,
    emoji: Emojis.castle,
    rent: 10_000,
    buildTime: Times.day * 2.5,
  },
};

export default realEstateConfig;
