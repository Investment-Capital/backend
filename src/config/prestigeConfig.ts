import Upgrades from "../enum/upgrades";
import PrestigeConfig from "../types/config/prestigeConfig";

const prestigeConfig: PrestigeConfig = {
  2: {
    cashRequired: 200_000,
    rewards: {
      xp: 100,
      upgrades: [
        {
          type: Upgrades.xpIncrease,
          amount: 10,
        },
        {
          type: Upgrades.stocksLimit,
          amount: 1_000,
        },
      ],
    },
  },
  3: {
    cashRequired: 1_500_000,
    rewards: {
      xp: 250,
      upgrades: [
        {
          type: Upgrades.incomeIncrease,
          amount: 15,
        },
        {
          type: Upgrades.startingCash,
          amount: 2_500,
        },
        {
          type: Upgrades.realEstateLimit,
          amount: 1,
        },
      ],
    },
  },
};

export default prestigeConfig;
