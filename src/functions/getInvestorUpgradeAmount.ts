import levelsConfig from "../config/levelsConfig";
import prestigeConfig from "../config/prestigeConfig";
import shopConfig from "../config/shopConfig";
import upgradesConfig from "../config/upgradesConfig";
import ShopItems from "../enum/shopItems";
import Upgrades from "../enum/upgrades";
import Investor from "../types/investor";
import getInvestorLevel from "./getInvestorLevel";

const getInvestorUpgradeAmount = (investor: Investor, upgrade: Upgrades) => {
  let amount = upgradesConfig[upgrade].default;

  for (const [levelString, config] of Object.entries(levelsConfig)) {
    if (
      !config.rewards ||
      !config.rewards.upgrade ||
      config.rewards.upgrade.type !== upgrade ||
      parseInt(levelString) > getInvestorLevel(investor.xp)
    )
      continue;

    amount += config.rewards.upgrade.amount;
  }

  for (const [prestigeString, config] of Object.entries(prestigeConfig)) {
    const foundUpgrade = config.rewards.upgrades.find(
      (configUpgrade) => configUpgrade.type == upgrade
    );

    if (parseInt(prestigeString) > investor.prestige || !foundUpgrade) continue;

    amount += foundUpgrade.amount;
  }

  for (const item of Object.values(ShopItems)) {
    const config = shopConfig[item];
    if (config.upgrade.type !== upgrade) continue;

    amount += investor.shop[item] * config.upgrade.amount;
  }

  return amount;
};

export default getInvestorUpgradeAmount;
