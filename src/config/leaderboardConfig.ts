import LeaderboardConfigType from "../types/config/leaderboardConfig";
import Investor from "../types/investor";

class LeaderboardConfig {
  static investors: LeaderboardConfigType<Investor> = {
    dataSet: (cache) =>
      cache.investors.filter((investor) => !investor.blacklist.blacklisted),

    mapData: (investor) => investor.user,

    leaderboards: [
      {
        name: "cash",
        getValue: (investor) => investor.cash,
      },
      {
        name: "prestige",
        getValue: (investor) => investor.prestige,
      },
      {
        name: "created",
        getValue: (investor) => investor.created,
      },
    ],
  };
}

export default LeaderboardConfig;
