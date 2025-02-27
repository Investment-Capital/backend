import Emojis from "../classes/emojis";
import formatNumber from "../functions/formatNumber";
import UpgradesConfig from "../types/config/upgradesConfig";

const upgradesConfig: UpgradesConfig = {
  realEstateLimit: {
    default: 4,
    name: "Real Estate Limit",
    emoji: Emojis.house,
    formatValue: formatNumber,
  },
  stocksLimit: {
    default: 2_000,
    emoji: Emojis.chart,
    name: "Stocks Limit",
    formatValue: formatNumber,
  },
  incomeIncrease: {
    default: 100,
    name: "Income Increase",
    emoji: Emojis.moneyBag,
    formatValue: (value) => `+${formatNumber(value)}%`,
  },
  xpIncrease: {
    default: 100,
    emoji: Emojis.xp,
    name: "Xp Increase",
    formatValue: (value) => `+${formatNumber(value)}%`,
  },
  startingCash: {
    default: 1_000,
    emoji: Emojis.cash,
    name: "Starting Cash",
    formatValue: (value) => `$${formatNumber(value)}`,
  },
};

export default upgradesConfig;
