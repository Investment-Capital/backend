import levelsConfig from "../config/levelsConfig";

const getInvestorLevel = (xp: number) => {
  for (const [level, config] of Object.entries(levelsConfig)) {
    if (config.xpRequired > xp) return parseInt(level) - 1;
  }

  return Math.max(...Object.keys(levelsConfig).map((level) => parseInt(level)));
};

export default getInvestorLevel;
