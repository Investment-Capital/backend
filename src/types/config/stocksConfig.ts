import Stocks from "../../enum/stocks";

type StocksConfig = {
  [_ in Stocks]: {
    volatility: number;
    income: number;
    basePrice: number;
    prestigeRequirement: number;
  };
};

export default StocksConfig;
