import LeaderboardsConfig from "../config/leaderboardsConfig";
import Cache from "../types/cache";
import LeaderboardsConfigType from "../types/config/leaderboardsConfig";

const getLeaderboardData = <T = {}>(
  type: string,
  leaderboard: string,
  page: number,
  cache: Cache
): ({ position: number; value: number } & T)[] => {
  const leaderboardTypeConfig: LeaderboardsConfigType =
    LeaderboardsConfig[type as keyof LeaderboardsConfig];

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
