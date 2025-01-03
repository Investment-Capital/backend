import Cache from "../cache";

type LeaderboardsConfig<T = any> = {
  dataSet: (cache: Cache) => T[];
  mapData: (data: T) => {
    image: string;
    name: string;
  };

  leaderboards: { [key: string]: (value: T) => number };
};

export default LeaderboardsConfig;
