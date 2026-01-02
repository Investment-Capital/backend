import InvestorType from "../types/investor";
import StockConfig from "../types/stockConfig";
import StockMarketHistory from "../types/stockMarketHistory";
import Stock from "./stock";

class Investor {
  static income = (
    investor: InvestorType,
    stockPrices: StockMarketHistory[],
    stockConfigs: StockConfig[]
  ) => {
    let income = 0;

    for (const stockId of investor.stocks.keys()) {
      const owned = investor.stocks.get(stockId);
      const config = stockConfigs.find((config) => config.id == stockId);
      const price = stockPrices.find((data) => data.id == stockId)?.price;

      if (!config || !price || !owned) continue;
      income += Stock.calculateDividend(price, owned, config);
    }

    return income;
  };
}

export default Investor;
