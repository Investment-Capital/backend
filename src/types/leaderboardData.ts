import LeaderboardTypes from "../enum/leaderboardTypes";
import LeaderboardsConfig from "./config/leaderboardsConfig";

type LeaderboardData = ReturnType<
  LeaderboardsConfig[LeaderboardTypes]["mapData"]
> & {
  position: number;
  value: number;
  formattedValue: string;
};

export default LeaderboardData;
