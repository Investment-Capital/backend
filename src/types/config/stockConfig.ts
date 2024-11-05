import Stocks from "../../enum/stocks";

type StockConfig = {
  [_ in Stocks]: {
    volatility: number;
    income: number;
    basePrice: number;
    prestigeRequirement: number;
  };
};

export default StockConfig;
