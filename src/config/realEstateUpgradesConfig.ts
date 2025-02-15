import Emojis from "../classes/emojis";
import Times from "../classes/times";
import RealEstate from "../enum/realEstate";
import RealEstateUpgradesConfig from "../types/config/realEstateUpgradesConfig";

const realEstateUpgradesConfig: RealEstateUpgradesConfig = {
  paint: {
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f58c-fe0f.png",
    emoji: Emojis.paint,
    price: 10_000,
    upgradeTime: Times.hour * 6,
    valueMultiplier: 1.1,
    requiredPrestige: 2,
    allowedRealEstate: [RealEstate.appartment, RealEstate.house],
  },

  decor: {
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f6cb-fe0f.png",
    emoji: Emojis.couch,
    price: 25_000,
    upgradeTime: Times.hour * 12,
    valueMultiplier: 1.125,
    requiredPrestige: 3,
    allowedRealEstate: [
      RealEstate.house,
      RealEstate.warehouse,
      RealEstate.skyscraper,
      RealEstate.appartment,
      RealEstate.castle,
    ],
  },

  parking: {
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f699.png",
    emoji: Emojis.car,
    price: 35_000,
    valueMultiplier: 1.15,
    requiredPrestige: 4,
    allowedRealEstate: [
      RealEstate.house,
      RealEstate.appartment,
      RealEstate.castle,
    ],
    upgradeTime: Times.hour * 18,
  },

  heating: {
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f525.png",
    emoji: Emojis.fire,
    price: 50_000,
    upgradeTime: Times.day,
    valueMultiplier: 1.15,
    requiredPrestige: 5,
    allowedRealEstate: [
      RealEstate.house,
      RealEstate.warehouse,
      RealEstate.skyscraper,
      RealEstate.castle,
    ],
  },

  expansion: {
    image: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f528.png",
    emoji: Emojis.hammer,
    price: 70_000,
    upgradeTime: Times.day * 3,
    valueMultiplier: 1.2,
    requiredPrestige: 7,
    allowedRealEstate: [
      RealEstate.warehouse,
      RealEstate.skyscraper,
      RealEstate.appartment,
    ],
  },

  security: {
    image:
      "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f482-200d-2642-fe0f.png",
    emoji: Emojis.guard,
    requiredPrestige: 9,
    price: 140_000,
    valueMultiplier: 1.2,
    upgradeTime: Times.day * 4,
    allowedRealEstate: [
      RealEstate.skyscraper,
      RealEstate.warehouse,
      RealEstate.castle,
    ],
  },
};

export default realEstateUpgradesConfig;
