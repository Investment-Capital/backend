import Emojis from "../classes/emojis";
import formatNumber from "../functions/formatNumber";
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
    },
  },
};

export default leaderboardsConfig;
