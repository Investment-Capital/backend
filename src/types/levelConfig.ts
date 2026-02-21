type LevelConfig = {
  level: number;
  xpRequired: number;
  rewards: {
    cash?: number;
    stocks?: Map<string, number>;
  };
};

export default LevelConfig;
