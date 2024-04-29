import Investments from "../types/investments/investments";
import Investment from "../types/markets/investment";
import Markets from "../types/markets/markets";
import basePrices from "./investments/basePrices";

const getValues = (name: Investments) => {
  return {
    price: basePrices[name],
    history: [
      {
        date: Date.now(),
        value: basePrices[name],
      },
    ],
  } satisfies Investment;
};

class defaultValues {
  static investors = {
    investors: [],
  };

  static markets: Markets = {
    stocks: {
      sop: getValues("sop"),
      rbx: getValues("rbx"),
      apl: getValues("apl"),
    },
  };
}

export default defaultValues;
