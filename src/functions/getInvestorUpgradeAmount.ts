import levelsConfig from "../config/levelsConfig";
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
      parseInt(levelString) > getInvestorLevel(investor)
    )
      continue;

    amount += config.rewards?.upgrade?.amount;
  }

  return amount;
};

export default getInvestorUpgradeAmount;
