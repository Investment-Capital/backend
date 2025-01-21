import Emojis from "../classes/emojis";
import Times from "../classes/times";
import RealEstateConfig from "../types/config/realEstateConfig";

const appartmentUpgrades: RealEstateConfig["appartment"]["upgrades"] = {
  paint: {
    image: "",
    emoji: Emojis.paint,
    price: 2_500,
    upgradeTime: Times.hour * 6,
    priceMultiplier: 1.1,
  },
};

const houseUpgrades: RealEstateConfig["house"]["upgrades"] = {
  ...appartmentUpgrades,
  decor: {
    image: "",
    emoji: Emojis.couch,
    price: 15_000,
    upgradeTime: Times.hour * 12,
    priceMultiplier: 1.125,
  },
};

const warehouseUpgrades: RealEstateConfig["warehouse"]["upgrades"] = {
  ...houseUpgrades,
  heating: {
    image: "",
    emoji: Emojis.fire,
    price: 35_000,
    upgradeTime: Times.day,
    priceMultiplier: 1.15,
  },
};

const skyscraperUpgrades: RealEstateConfig["skyscraper"]["upgrades"] = {
  ...warehouseUpgrades,
  expansion: {
    image: "",
    emoji: Emojis.hammer,
    price: 60_000,
    upgradeTime: Times.day * 3,
    priceMultiplier: 1.2,
  },
};

const realEstateConfig: RealEstateConfig = {
  appartment: {
    basePrice: 50_000,
    requiredPrestige: 2,
    volatility: 6,
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3da-fe0f.png",
    emoji: Emojis.abandonedHouse,
    hourlyRent: 250,
    upgrades: appartmentUpgrades,
    buildTime: Times.hour * 12,
  },

  house: {
    basePrice: 125_000,
    requiredPrestige: 2,
    volatility: 6.5,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3e0.png",
    emoji: Emojis.house,
    hourlyRent: 1_000,
    upgrades: houseUpgrades,
    buildTime: Times.day,
  },

  warehouse: {
    basePrice: 225_000,
    requiredPrestige: 3,
    volatility: 6.75,
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3e2.png",
    emoji: Emojis.office,
    hourlyRent: 2_250,
    upgrades: warehouseUpgrades,
    buildTime: Times.day * 1.5,
  },

  skyscraper: {
    basePrice: 450_000,
    requiredPrestige: 5,
    volatility: 7,
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3d9-fe0f.png",
    emoji: Emojis.cityScape,
    hourlyRent: 5_000,
    upgrades: skyscraperUpgrades,
    buildTime: Times.day * 3,
  },
};

export default realEstateConfig;
