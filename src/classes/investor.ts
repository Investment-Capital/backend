import investors from "../database/schemas/investors";
import InvestorType from "../types/investor";
import LevelConfig from "../types/levelConfig";
import StockConfig from "../types/stockConfig";
import StockMarketHistory from "../types/stockMarketHistory";
import Stock from "./stock";

class Investor {
  static income = (
    investor: InvestorType,
    stockPrices: StockMarketHistory[],
    stockConfigs: StockConfig[],
  ) => {
    let income = 0;

    for (const stockId of investor.stocks.keys()) {
      const owned = investor.stocks.get(stockId);
      const config = stockConfigs.find((config) => config.id == stockId);
      const price = stockPrices.find((data) => data.id == stockId)?.price;

      if (!config || !price || !owned) continue;
      income += Stock.calculateDividend(price, owned, config);
    }

    return income;
  };

  static level = (xp: number, levelConfigs: LevelConfig[]) => {
    let level = 0;

    while (true) {
      const config = levelConfigs.find((config) => config.level == level + 1);
      if (!config || config.xpRequired > xp) break;

      level += 1;
      xp -= config.xpRequired;
    }

    return level;
  };

  static giveXp = async (
    amount: number,
    investor: InvestorType,
    levelConfigs: LevelConfig[],
  ) => {
    const level = Investor.level(investor.xp, levelConfigs);
    const newLevel = Investor.level(investor.xp + amount, levelConfigs);

    const rewards = {
      cash: 0,
      stocks: new Map(),
    };

    for (let rewardLevel = level + 1; rewardLevel <= newLevel; rewardLevel++) {
      const config = levelConfigs.find((config) => config.level == rewardLevel);
      rewards.cash += config?.rewards.cash ?? 0;
      for (const [id, amount] of config?.rewards.stocks ?? []) {
        rewards.stocks.set(id, (rewards.stocks.get(id) ?? 0) + amount);
      }
    }

    await investors.updateOne(
      { "account.profile.id": investor.account.profile.id },
      {
        $inc: {
          xp: amount,
          cash: rewards.cash,
          ...Object.fromEntries(
            [...rewards.stocks].map(([id, stockAmount]) => [
              `stocks.${id}`,
              stockAmount,
            ]),
          ),
        },
      },
    );
  };
}

export default Investor;
