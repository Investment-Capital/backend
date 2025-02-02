import Emojis from "../classes/emojis";
import LeaderboardsConfigType from "../types/config/leaderboardsConfig";
import Investor from "../types/investor";

const leaderboardsConfig: LeaderboardsConfigType = {
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
        emoji: Emojis.cash,
      },
      prestige: {
        getValue: (investor: Investor) => investor.prestige,
        emoji: Emojis.prestige,
      },
    },
  },
};

export default leaderboardsConfig;
