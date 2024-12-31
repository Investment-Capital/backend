import Stocks from "../../enum/stocks";

type StocksConfig = {
  [_ in Stocks]: {
    volatility: number;
    income: number;
    basePrice: number;
    prestigeRequirement: number;
    image: string;
    emoji: string;
  };
};

export default StocksConfig;
