import levelsConfig from "../config/levelsConfig";
import Investor from "../types/investor";

const getInvestorLevel = (investor: Investor) => {
  for (const [level, config] of Object.entries(levelsConfig)) {
    if (config.xpRequired > investor.xp) return parseInt(level) - 1;
  }

  return 1;
};

export default getInvestorLevel;
