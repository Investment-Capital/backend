import Cache from "../cache";

type LeaderboardConfig<T = any> = {
  dataSet: (cache: Cache) => T[];
  mapData: (data: T) => any;

  leaderboards: {
    getValue: (data: T) => number;
    name: string;
  }[];
};

export default LeaderboardConfig;
