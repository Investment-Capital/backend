import emitterValues from "../../classes/emitterValues";
import stocks from "../../classes/stocks";
import timeManager from "../../classes/timeManager";
import times from "../../classes/times";
import basePrices from "../../config/investments/basePrices";
import volatility from "../../config/investments/volatility";
import markets from "../../database/schemas/markets";
import Stocks from "../../types/investments/stocks";
import StockMarket from "../../types/markets/stockMarket";
import SchedualedTask from "../../types/schedualedTask";

export default {
  nextDate: timeManager.stockUpdate() / 1000,
  interval: times.hour / 1000,
  execute: async (cache) => {
    const before = cache.markets.stocks;
    const after = {} as StockMarket;

    for (const stock of Object.keys(stocks) as Stocks[]) {
      const basePrice = basePrices[stock];
      const newPrice = Math.max(
        Math.min(
          Math.floor(
            (Math.random() * basePrice * 2) / volatility[stock] -
              basePrice / volatility[stock]
          ) + before[stock].price,
          basePrice * 3
        ),
        basePrice
      );

      after[stock] = {
        price: newPrice,
        history: [
          ...before[stock].history,
          {
            date: Date.now(),
            value: newPrice,
          },
        ],
      };
    }

    cache.events.emit(emitterValues.markets, {
      market: "stocks",
      data: after,
    });

    cache.markets.stocks = after;

    await markets.updateOne({
      stocks: after,
    });
  },
} satisfies SchedualedTask;
