import Emojis from "../classes/emojis";
import Upgrades from "../enum/upgrades";
import ShopConfig from "../types/config/shopConfig";

const shopConfig: ShopConfig = {
  inheritance: {
    requiredPresige: 1,
    resetOnPrestige: true,
    basePrice: 25_000,
    priceMultiplier: 3,
    emoji: Emojis.dna,
    upgrade: {
      type: Upgrades.startingCash,
      amount: 2_000,
    },
  },
  trader: {
    requiredPresige: 1,
    resetOnPrestige: true,
    basePrice: 20_000,
    priceMultiplier: 2.75,
    emoji: Emojis.chart,
    upgrade: {
      type: Upgrades.stocksLimit,
      amount: 2_500,
    },
  },
  mastery: {
    requiredPresige: 1,
    resetOnPrestige: false,
    basePrice: 75_000,
    priceMultiplier: 2,
    emoji: Emojis.xp,
    upgrade: {
      type: Upgrades.xpIncrease,
      amount: 10,
    },
  },
  expansion: {
    requiredPresige: 2,
    resetOnPrestige: true,
    basePrice: 60_000,
    priceMultiplier: 2.25,
    emoji: Emojis.house,
    upgrade: {
      type: Upgrades.realEstateLimit,
      amount: 1,
    },
  },
  insurance: {
    resetOnPrestige: false,
    requiredPresige: 3,
    basePrice: 50_000,
    priceMultiplier: 2.5,
    emoji: Emojis.skull,
    upgrade: {
      type: Upgrades.startingCash,
      amount: 3_000,
    },
  },
};

export default shopConfig;
