import Upgrade from "../upgrade";

type PrestigeConfig = {
  [prestige: number]: {
    rewards: {
      xp: number;
      upgrades: Upgrade[];
    };
    cashRequired: number;
  };
};

export default PrestigeConfig;
