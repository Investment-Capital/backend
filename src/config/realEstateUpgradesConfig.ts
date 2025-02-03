import Emojis from "../classes/emojis";
import Times from "../classes/times";
import RealEstate from "../enum/realEstate";
import RealEstateUpgradesConfig from "../types/config/realEstateUpgradesConfig";

const realEstateUpgradesConfig: RealEstateUpgradesConfig = {
  paint: {
    image: "",
    emoji: Emojis.paint,
    price: 2_500,
    upgradeTime: Times.hour * 6,
    priceMultiplier: 1.1,
    requiredPrestige: 2,
    allowedRealEstate: [
      RealEstate.appartment,
      RealEstate.house,
      RealEstate.warehouse,
      RealEstate.skyscraper,
    ],
  },
  decor: {
    image: "",
    emoji: Emojis.couch,
    price: 15_000,
    upgradeTime: Times.hour * 12,
    priceMultiplier: 1.125,
    requiredPrestige: 3,
    allowedRealEstate: [
      RealEstate.house,
      RealEstate.warehouse,
      RealEstate.skyscraper,
    ],
  },
  heating: {
    image: "",
    emoji: Emojis.fire,
    price: 35_000,
    upgradeTime: Times.day,
    priceMultiplier: 1.15,
    requiredPrestige: 5,
    allowedRealEstate: [
      RealEstate.house,
      RealEstate.warehouse,
      RealEstate.skyscraper,
    ],
  },
  expansion: {
    image: "",
    emoji: Emojis.hammer,
    price: 60_000,
    upgradeTime: Times.day * 3,
    priceMultiplier: 1.2,
    requiredPrestige: 7,
    allowedRealEstate: [RealEstate.warehouse, RealEstate.skyscraper],
  },
};

export default realEstateUpgradesConfig;
