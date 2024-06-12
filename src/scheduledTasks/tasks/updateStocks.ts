import Logger from "../../classes/logger";
import TimeManager from "../../classes/timeManager";
import markets from "../../database/schemas/markets";
import EmitterValues from "../../classes/emitterValues";
import Stocks from "../../enum/stocks";
import ScheduledTask from "../../types/scheduledTask";
import calculatePrice from "../../functions/calculatePrice";
import InvestmentConfig from "../../config/investmentConfig";

export default {
  date: TimeManager.stockUpdate,
  execute: async (cache) => {
    Logger.success("Stock Market has been updated");
    const stockMarket = { ...cache.markets.stocks };

    for (const stock of Object.values(Stocks)) {
      const stockConfig = InvestmentConfig.stocks[stock];

      const newPrice = calculatePrice(
        stockMarket[stock].price,
        stockConfig.basePrice,
        stockConfig.volatility
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
