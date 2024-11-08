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

class DefaultValues {
  static markets: Markets = {
    stocks: {
      sop: getStockValues(Stocks.sop),
      rbx: getStockValues(Stocks.rbx),
      apl: getStockValues(Stocks.apl),
      abc: getStockValues(Stocks.abc),
    },
  };
}

export default DefaultValues;
