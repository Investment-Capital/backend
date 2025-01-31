import LeaderboardsConfig from "../config/leaderboardsConfig";
import Cache from "../types/cache";

const getLeaderboardData = (
  cache: Cache,
  type: string,
  leaderboard: string,
  page: number
) => {
  const leaderboardTypeConfig = LeaderboardsConfig[type];

  const leaderboardConfig = leaderboardTypeConfig.leaderboards[leaderboard];
  const dataSet = leaderboardTypeConfig.dataSet(cache);

  return dataSet
    .sort((a, b) => leaderboardConfig(b) - leaderboardConfig(a))
    .slice((page - 1) * 10, page * 10)
    .map((data, index) => ({
      ...leaderboardTypeConfig.mapData(data),
      position: page * 10 - 9 + index,
      value: leaderboardConfig(data),
    }));
};

export default getLeaderboardData;
