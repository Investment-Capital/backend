import pageSize from "../config/pageSize";
import LeaderboardTypes from "../enum/leaderboardTypes";
import LeaderboardsConfig from "../types/config/leaderboardsConfig";
import LeaderboardData from "../types/leaderboardData";

const getLeaderboardData = (
  dataSet: any[],
  getValue: LeaderboardsConfig[LeaderboardTypes]["leaderboards"][string]["getValue"],
  mapData: LeaderboardsConfig[LeaderboardTypes]["mapData"],
  formatValue: LeaderboardsConfig[LeaderboardTypes]["leaderboards"][string]["formatValue"],
  page: number
): LeaderboardData[] =>
  dataSet
    .sort((a, b) => getValue(b) - getValue(a))
    .slice((page - 1) * pageSize, page * pageSize)
    .map((data, index) => {
      const value = getValue(data);

      return {
        ...mapData(data),
        position: page * pageSize - (pageSize - 1) + index,
        value: value,
        formattedValue: formatValue(value),
      };
    });

export default getLeaderboardData;
