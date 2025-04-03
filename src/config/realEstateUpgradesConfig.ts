import Emojis from "../classes/emojis";
import Images from "../classes/images";
import Times from "../classes/times";
import RealEstate from "../enum/realEstate";
import RealEstateUpgradesConfig from "../types/config/realEstateUpgradesConfig";

const realEstateUpgradesConfig: RealEstateUpgradesConfig = {
  paint: {
    image: Images.paint,
    emoji: Emojis.paint,
    price: 10_000,
    upgradeTime: Times.hour * 6,
    valueMultiplier: 1.1,
    requiredPrestige: 2,
    allowedRealEstate: [RealEstate.appartment, RealEstate.house],
  },

  decor: {
    image: Images.paint,
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
    image: Images.paint,
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
    image: Images.fire,
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
    image: Images.hammer,
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
    image: Images.guard,
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
