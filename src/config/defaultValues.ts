import Stocks from "../enum/stocks";
import Investment from "../types/markets/investment";
import Markets from "../types/markets/markets";
import BasePrice from "./basePrice";

const getValues = (name: Stocks) => {
  return {
    price: BasePrice.stocks[name],
    history: [
      {
        date: Date.now(),
        value: BasePrice.stocks[name],
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
