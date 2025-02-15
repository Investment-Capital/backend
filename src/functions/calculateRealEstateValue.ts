import realEstateUpgradesConfig from "../config/realEstateUpgradesConfig";
import Markets from "../types/markets/markets";
import RealEstate from "../types/realEstate";

const calculateRealEstateValue = (realEstate: RealEstate, markets: Markets) => {
  let basePrice = markets.realEstate[realEstate.type].price;

  for (const upgrade of realEstate.upgrades.filter(
    (upgrade) => upgrade.completed
  )) {
    const upgradeConfig = realEstateUpgradesConfig[upgrade.type];
    basePrice *= upgradeConfig.valueMultiplier;
  }

  return basePrice;
};

export default calculateRealEstateValue;
