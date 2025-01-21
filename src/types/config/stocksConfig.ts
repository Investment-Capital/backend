import Stocks from "../../enum/stocks";

type StocksConfig = {
  [_ in Stocks]: {
    volatility: number;
    income: number;
    basePrice: number;
    requiredPrestige: number;
    image: string;
    emoji: string;
  };
};

export default StocksConfig;
