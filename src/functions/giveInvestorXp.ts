import levelsConfig from "../config/levelsConfig";
import Upgrades from "../enum/upgrades";
import Cache from "../types/cache";
import Investor from "../types/investor";
import editInvestor from "./editInvestor";
import getInvestorLevel from "./getInvestorLevel";
import getInvestorUpgradeAmount from "./getInvestorUpgradeAmount";

const giveInvestorXp = (cache: Cache, investor: Investor, xp: number) => {
  const addedXp =
    xp * (getInvestorUpgradeAmount(investor, Upgrades.xpIncrease) / 100);
  const current = getInvestorLevel(investor.xp);
  const newLevel = getInvestorLevel(investor.xp + addedXp);

  let totalCashReward = 0;

  for (let level = current + 1; level < newLevel + 1; level++) {
    const config = levelsConfig[level];
    if (config.rewards?.cash) totalCashReward += config.rewards.cash;
  }

  editInvestor(cache, investor, () => {
    investor.cash += totalCashReward;
    investor.xp += addedXp;
  });
};

export default giveInvestorXp;
