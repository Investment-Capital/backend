import RealEstate from "../../enum/realEstate";
import RealEstateUpgrades from "../../enum/realEstateUpgrades";

type RealEstateUpgradesConfig = {
  [_ in RealEstateUpgrades]: {
    image: string;
    emoji: string;
    price: number;
    priceMultiplier: number;
    upgradeTime: number;
    requiredPrestige: number;

    allowedRealEstate: RealEstate[];
  };
};

export default RealEstateUpgradesConfig;
