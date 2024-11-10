import Stocks from "../enum/stocks";
import Investment from "../types/markets/investment";
import Markets from "../types/markets/markets";
import stocksConfig from "./stocksConfig";

const getStockValues = (stock: Stocks) => {
  const stockConfig = stocksConfig[stock];

  return {
    price: stockConfig.basePrice,
    history: [
      {
        date: Date.now(),
        value: stockConfig.basePrice,
      },
    ],
  } satisfies Investment;
};

const defaultMarketData: Markets = {
  stocks: Object.values(Stocks).reduce((prev: any, stock) => {
    prev[stock] = getStockValues(stock);
    return prev;
  }, {}),
};

export default defaultMarketData;
