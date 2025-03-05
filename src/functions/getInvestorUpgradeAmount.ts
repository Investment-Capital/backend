import levelsConfig from "../config/levelsConfig";
import prestigeConfig from "../config/prestigeConfig";
import upgradesConfig from "../config/upgradesConfig";
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

  return amount;
};

export default getInvestorUpgradeAmount;
