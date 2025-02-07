import RealEstate from "../../enum/realEstate";
import Stocks from "../../enum/stocks";
import Market from "./market";

type Markets = {
  stocks: Market<typeof Stocks>;
  realEstate: Market<typeof RealEstate>;
};

export default Markets;
