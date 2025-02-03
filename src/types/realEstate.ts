import RealEstateEnum from "../enum/realEstate";
import RealEstateUpgrades from "../enum/realEstateUpgrades";

type RealEstate = {
  name: string;
  type: RealEstateEnum;
  created: number;
  built: boolean;

  upgrades: {
    completed: boolean;
    created: number;
    type: RealEstateUpgrades;
  }[];
};

export default RealEstate;
