import RealEstateEnum from "../enum/realEstate";

type RealEstate = {
  name: string;
  type: RealEstateEnum;
  upgrades: {
    completed: boolean;
    created: number;
    type: string;
  }[];
  created: number;
  built: boolean;
};

export default RealEstate;
