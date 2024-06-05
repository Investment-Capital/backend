import Stocks from "../enum/stocks";
import Investment from "../types/markets/investment";
import Markets from "../types/markets/markets";
import BasePrices from "./investments/basePrices";

const getValues = (name: Stocks) => {
  return {
    price: BasePrices[name],
    history: [
      {
        date: Date.now(),
        value: BasePrices[name],
      },
    ],
  } satisfies Investment;
};

class DefaultValues {
  static investors = {
    investors: [],
  };

  static markets: Markets = {
    stocks: {
      sop: getValues(Stocks.sop),
      rbx: getValues(Stocks.rbx),
      apl: getValues(Stocks.apl),
    },
  };
}

export default DefaultValues;
