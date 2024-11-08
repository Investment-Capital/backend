import Cache from "../cache";

type LeaderboardsConfig<T = any> = {
  dataSet: (cache: Cache) => T[];
  mapData: (data: T) => any;

  leaderboards: { [key: string]: (value: T) => number };
};

export default LeaderboardsConfig;
