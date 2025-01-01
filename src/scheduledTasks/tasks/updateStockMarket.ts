import Logger from "../../classes/logger";
import TimeManager from "../../classes/timeManager";
import markets from "../../database/schemas/markets";
import EmitterValues from "../../classes/emitterValues";
import Stocks from "../../enum/stocks";
import ScheduledTask from "../../types/scheduledTask";
import calculateNextPrice from "../../functions/calculateNextPrice";
import stockConfig from "../../config/stockConfig";
import Cache from "../../types/cache";

export default {
  date: TimeManager.hourly,
  execute: async (cache: Cache) => {
    Logger.success("Stock Market has been updated");
    const stockMarket = { ...cache.markets.stocks };

    for (const stock of Object.values(Stocks)) {
      const config = stockConfig[stock];

      const newPrice = calculateNextPrice(
        stockMarket[stock].price,
        config.basePrice,
        config.volatility
      );

      if (newPrice == stockMarket[stock].price) continue;

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
