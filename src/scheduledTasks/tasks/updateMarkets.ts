import EmitterValues from "../../classes/emitterValues";
import Logger from "../../classes/logger";
import TimeManager from "../../classes/timeManager";
import markets from "../../database/schemas/markets";
import Markets from "../../enum/markets";
import calculateNextPrice from "../../functions/calculateNextPrice";
import generateMarketGraphs from "../../functions/generateMarketGraphs";
import getInvestmentConfig from "../../functions/getInvestmentConfig";
import Cache from "../../types/cache";
import ScheduledTask from "../../types/scheduledTask";

export default {
  time: TimeManager.hourly,
  execute: async (cache: Cache) => {
    for (const marketName of Object.values(Markets)) {
      Logger.success(`${marketName} Market has been updated`);
      const market = { ...cache.markets[marketName] };

      for (const [investment, data] of Object.entries(market)) {
        const config = getInvestmentConfig(investment as any);

        const newPrice = calculateNextPrice(
          data.price,
          config.basePrice,
          config.volatility
        );

        if (newPrice == data.price) continue;

        data.price = newPrice;
        data.history.push({
          date: Date.now(),
          value: newPrice,
        });
      }

      cache.events.emit(EmitterValues.markets, {
        market: marketName,
        data: market,
      });

      cache.markets[marketName] = market as any;
      cache.marketGraphs[marketName] = await generateMarketGraphs(market);

      await markets.updateOne({
        [marketName]: market,
      });
    }
  },
} satisfies ScheduledTask;
