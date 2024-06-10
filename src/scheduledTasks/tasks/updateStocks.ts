import Logger from "../../classes/logger";
import TimeManager from "../../classes/timeManager";
import markets from "../../database/schemas/markets";
import EmitterValues from "../../classes/emitterValues";
import Stocks from "../../enum/stocks";
import ScheduledTask from "../../types/scheduledTask";
import calculatePrice from "../../functions/calculatePrice";
import BasePrice from "../../config/basePrice";
import Volatility from "../../config/volatility";

export default {
  date: TimeManager.stockUpdate,
  execute: async (cache) => {
    Logger.success("Stock Market has been updated");
    const stockMarket = { ...cache.markets.stocks };

    for (const stock of Object.values(Stocks)) {
      const newPrice = calculatePrice(
        stockMarket[stock].price,
        BasePrice.stocks[stock],
        Volatility.stocks[stock]
      );

      stockMarket[stock].price = newPrice;
      stockMarket[stock].history.push({
        date: Date.now(),
        value: newPrice,
      });
    }

    cache.events.emit(EmitterValues.markets, {
      market: "stocks",
      data: stockMarket,
    });

    cache.markets.stocks = stockMarket;

    await markets.updateOne({
      stocks: stockMarket,
    });
  },
} satisfies ScheduledTask;
