import RealEstate from "../../enum/realEstate";

type RealEstateConfig = {
  [_ in RealEstate]: {
    basePrice: number;
    requiredPrestige: number;
    volatility: number;
    image: string;
    emoji: string;
    hourlyRent: number;
    buildTime: number;
  };
};

export default RealEstateConfig;
