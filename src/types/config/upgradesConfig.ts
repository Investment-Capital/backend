import Upgrades from "../../enum/upgrades";

type UpgradesConfig = {
  [_ in Upgrades]: {
    default: number;
    emoji: string;
    image: string;
    name: string;
    formatValue: (value: number) => string;
  };
};

export default UpgradesConfig;
