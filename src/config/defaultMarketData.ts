import RealEstate from "../enum/realEstate";
import Stocks from "../enum/stocks";
import Investment from "../types/markets/investment";
import Markets from "../types/markets/markets";
import realEstateConfig from "./realEstateConfig";
import stockConfig from "./stockConfig";

const getInvestmentValues = (investment: Stocks | RealEstate) => {
  const config =
    investment in stockConfig
      ? (stockConfig as any)[investment]
      : (realEstateConfig as any)[investment];

  return {
    price: config.basePrice,
    history: [
      {
        date: Date.now(),
        value: config.basePrice,
      },
    ],
  } satisfies Investment;
};

const defaultMarketData: Markets = {
  stocks: Object.values(Stocks).reduce((prev: any, stock) => {
    prev[stock] = getInvestmentValues(stock);
    return prev;
  }, {}),
  realEstate: Object.values(RealEstate).reduce((prev: any, realEstate) => {
    prev[realEstate] = getInvestmentValues(realEstate);
    return prev;
  }, {}),
};

export default defaultMarketData;
