import Upgrade from "../upgrade";

type LevelsConfig = {
  [_: number]: {
    xpRequired: number;
    rewards?: {
      cash?: number;
      upgrade?: Upgrade;
    };
  };
};

export default LevelsConfig;
