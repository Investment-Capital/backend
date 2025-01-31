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
      cash: (investor: Investor) => investor.cash,
      prestige: (investor: Investor) => investor.prestige,
    },
  },
};

export default leaderboardsConfig;
