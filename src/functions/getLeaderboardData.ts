import pageSize from "../config/pageSize";
import LeaderboardTypes from "../enum/leaderboardTypes";
import LeaderboardsConfig from "../types/config/leaderboardsConfig";

const getLeaderboardData = (
  dataSet: any[],
  getValue: LeaderboardsConfig[LeaderboardTypes]["leaderboards"][string]["getValue"],
  mapData: LeaderboardsConfig[LeaderboardTypes]["mapData"],
  page: number
) =>
  dataSet
    .sort((a, b) => getValue(b) - getValue(a))
    .slice((page - 1) * pageSize, page * pageSize)
    .map((data, index) => ({
      ...mapData(data),
      position: page * pageSize - (pageSize - 1) + index,
      value: getValue(data),
    }));

export default getLeaderboardData;
