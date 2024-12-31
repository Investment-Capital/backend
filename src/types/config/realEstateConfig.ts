import RealEstate from "../../enum/realEstate";

type RealEstateConfig = {
  [_ in RealEstate]: {
    basePrice: number;
    prestigeRequirement: number;
    volatility: number;
    image: string;
    emoji: string;
    hourlyRent: number;
    buildTime: number;
    upgrades: {
      [name: string]: {
        image: string;
        emoji: string;
        price: number;
        priceMultiplier: number;
        upgradeTime: number;
      };
    };
  };
};

export default RealEstateConfig;
