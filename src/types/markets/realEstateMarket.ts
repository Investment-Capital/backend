import RealEstate from "../../enum/realEstate";
import Investment from "./investment";

type RealEstateMarket = {
  [_ in RealEstate]: Investment;
};

export default RealEstateMarket;
