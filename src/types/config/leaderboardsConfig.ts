import Cache from "../cache";

type LeaderboardsConfig = {
  [key: string]: {
    dataSet: (cache: Cache) => any[];
    mapData: (data: any) => {
      image: string;
      name: string;
    };

    leaderboards: { [key: string]: (value: any) => number };
  };
};

export default LeaderboardsConfig;
