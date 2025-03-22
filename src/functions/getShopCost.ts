import shopConfig from "../config/shopConfig";
import ShopItems from "../enum/shopItems";

const getShopCost = (item: ShopItems, currentLevel: number) => {
  const config = shopConfig[item];
  return config.basePrice * config.priceMultiplier ** currentLevel;
};

export default getShopCost;
