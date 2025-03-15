import Upgrade from "../upgrade";

type PrestigeConfig = {
  [_: number]: {
    rewards: {
      xp: number;
      upgrades: Upgrade[];
    };
    cashRequired: number;
  };
};

export default PrestigeConfig;
