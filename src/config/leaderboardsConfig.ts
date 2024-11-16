import LeaderboardsConfigType from "../types/config/leaderboardsConfig";
import Investor from "../types/investor";

class LeaderboardsConfig {
  static investors: LeaderboardsConfigType<Investor> = {
    dataSet: (cache) =>
      cache.investors.filter((investor) => !investor.blacklist.blacklisted),
    mapData: (investor) => investor.user,

    leaderboards: {
      cash: (investor) => investor.cash,
      prestige: (investor) => investor.prestige,
    },
  };
}

export default LeaderboardsConfig;
