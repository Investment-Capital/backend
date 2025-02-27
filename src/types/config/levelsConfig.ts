import Upgrade from "../upgrade";

type LevelsConfig = {
  [level: number]: {
    xpRequired: number;
    rewards?: {
      cash?: number;
      upgrade?: Upgrade;
    };
  };
};

export default LevelsConfig;
