import RealEstateEnum from "../enum/realEstate";

type RealEstate = {
  name: string;
  type: RealEstateEnum;
  upgrades: string[];
};

export default RealEstate;
