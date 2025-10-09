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

    for (const stock in investor.stocks) {
      const owned = investor.stocks.get(stock);
      const config = stockConfigs.find((config) => config.name == stock);
      const price = stockPrices.find((data) => data.stock == stock)?.price;

      if (!config || !price || !owned) continue;
      income += Stock.calculateDividend(price, owned, config);
    }

    return income;
  };
}

export default Investor;
