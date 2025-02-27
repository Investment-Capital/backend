import Upgrades from "../enum/upgrades";
import LevelsConfig from "../types/config/levelsConfig";

const levelsConfig: LevelsConfig = {
  1: {
    xpRequired: 0,
  },
  2: {
    xpRequired: 150,
    rewards: {
      upgrade: {
        type: Upgrades.stocksLimit,
        amount: 750,
      },
    },
  },
  3: {
    xpRequired: 300,
    rewards: {
      cash: 3_000,
    },
  },
  4: {
    xpRequired: 500,
    rewards: {
      upgrade: {
        type: Upgrades.startingCash,
        amount: 1_500,
      },
    },
  },
  5: {
    xpRequired: 750,
    rewards: {
      cash: 5_500,
    },
  },
  6: {
    xpRequired: 1_000,
    rewards: {
      upgrade: {
        type: Upgrades.incomeIncrease,
        amount: 5,
      },
    },
  },
  7: {
    xpRequired: 1_300,
    rewards: {
      cash: 8_000,
    },
  },
  8: {
    xpRequired: 1_650,
    rewards: {
      cash: 9_500,
    },
  },
  9: {
    xpRequired: 2_000,
    rewards: {
      upgrade: {
        type: Upgrades.startingCash,
        amount: 2_500,
      },
    },
  },
  10: {
    xpRequired: 2_500,
    rewards: {
      cash: 12_000,
      upgrade: {
        type: Upgrades.realEstateLimit,
        amount: 1,
      },
    },
  },
  11: {
    xpRequired: 3_100,
    rewards: {
      cash: 15_000,
    },
  },
  12: {
    xpRequired: 3_800,
    rewards: {
      upgrade: {
        type: Upgrades.stocksLimit,
        amount: 1_500,
      },
    },
  },
  13: {
    xpRequired: 4_600,
    rewards: {
      cash: 18_000,
    },
  },
  14: {
    xpRequired: 5_500,
    rewards: {
      upgrade: {
        type: Upgrades.realEstateLimit,
        amount: 1,
      },
    },
  },
  15: {
    xpRequired: 6_500,
    rewards: {
      cash: 25_000,
      upgrade: {
        type: Upgrades.incomeIncrease,
        amount: 10,
      },
    },
  },
};

export default levelsConfig;
