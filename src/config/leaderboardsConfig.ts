import Emojis from "../classes/emojis";
import formatNumber from "../functions/formatNumber";
import getInvestorIncome from "../functions/getInvestorIncome";
import getInvestorLevel from "../functions/getInvestorLevel";
import LeaderboardsConfig from "../types/config/leaderboardsConfig";
import Investor from "../types/investor";

const leaderboardsConfig: LeaderboardsConfig = {
  investors: {
    dataSet: (cache) =>
      cache.investors.filter((investor) => !investor.blacklist.blacklisted),
    mapData: (investor: Investor) => ({
      name: investor.user.username,
      image: investor.user.avatar,
    }),

    leaderboards: {
      cash: {
        getValue: (investor: Investor) => investor.cash,
        formatValue: (value) => `$${formatNumber(value)} cash`,
        emoji: Emojis.cash,
      },
      prestige: {
        getValue: (investor: Investor) => investor.prestige,
        formatValue: (value) => `Prestige ${value}`,
        emoji: Emojis.prestige,
      },
      income: {
        getValue: (investor: Investor) => getInvestorIncome(investor),
        formatValue: (value) => `$${formatNumber(value)}/hour`,
        emoji: Emojis.moneyBag,
      },
      level: {
        getValue: (investor: Investor) => getInvestorLevel(investor.xp),
        formatValue: (value) => `Level ${value}`,
        emoji: Emojis.xp,
      },
    },
  },
};

export default leaderboardsConfig;
