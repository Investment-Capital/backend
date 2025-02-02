import LeaderboardTypes from "../../enum/leaderboardTypes";
import Cache from "../cache";

type LeaderboardsConfig = {
  [_ in LeaderboardTypes]: {
    dataSet: (cache: Cache) => any[];
    mapData: (data: any) => {
      image: string;
      name: string;
    };

    leaderboards: {
      [key: string]: {
        getValue: (data: any) => number;
        emoji: string;
      };
    };
  };
};

export default LeaderboardsConfig;
