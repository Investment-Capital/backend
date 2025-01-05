import RealEstate from "../enum/realEstate";
import RealEstateType from "../types/realEstate";
import Cache from "../types/cache";
import Investor from "../types/investor";
import editInvestor from "./editInvestor";

const createRealEstate = (
  cache: Cache,
  investor: Investor,
  name: string,
  type: RealEstate
) => {
  const realEstateData: RealEstateType = {
    name,
    type,
    upgrades: [],
    created: Date.now(),
    built: false,
  };

  editInvestor(cache, investor, (investor) =>
    investor.realEstate.push(realEstateData)
  );

  return realEstateData;
};

export default createRealEstate;
