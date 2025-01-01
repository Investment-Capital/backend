import RealEstateEnum from "../enum/realEstate";

type RealEstate = {
  name: string;
  type: RealEstateEnum;
  upgrades: string[];
  created: number;
  built: boolean;
};

export default RealEstate;
