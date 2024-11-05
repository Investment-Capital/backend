type LeaderboardConfig<T = any> = {
  getValue: (data: T) => number;
  name: string;
};

export default LeaderboardConfig;
