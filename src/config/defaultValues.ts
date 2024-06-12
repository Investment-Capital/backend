import Stocks from "../enum/stocks";
import Investment from "../types/markets/investment";
import Markets from "../types/markets/markets";
import InvestmentConfig from "./investmentConfig";

const getValues = (stock: Stocks) => {
  const stockConfig = InvestmentConfig.stocks[stock];

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
      sop: getValues(Stocks.sop),
      rbx: getValues(Stocks.rbx),
      apl: getValues(Stocks.apl),
      abc: getValues(Stocks.abc),
    },
  };
}

export default DefaultValues;
