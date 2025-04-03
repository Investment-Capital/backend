import ShopItems from "../../enum/shopItems";
import Upgrade from "../upgrade";

type ShopConfig = {
  [_ in ShopItems]: {
    requiredPresige: number;
    resetOnPrestige: boolean;
    upgrade: Upgrade;
    basePrice: number;
    priceMultiplier: number;
    emoji: string;
    image: string;
  };
};

export default ShopConfig;
