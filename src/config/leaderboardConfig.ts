import LeaderboardConfigType from "../types/config/leaderboardConfig";
import Investor from "../types/investor";

class LeaderboardConfig {
  static investors: LeaderboardConfigType<Investor>[] = [
    {
      name: "cash",
      getValue: (investor) => investor.cash,
    },
    {
      name: "prestige",
      getValue: (investor) => investor.prestige,
    },
  ];
}

export default LeaderboardConfig;
