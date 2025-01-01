import Logger from "../../classes/logger";
import markets from "../../database/schemas/markets";
import EmitterValues from "../../classes/emitterValues";
import ScheduledTask from "../../types/scheduledTask";
import calculateNextPrice from "../../functions/calculateNextPrice";
import Cache from "../../types/cache";
import RealEstate from "../../enum/realEstate";
import realEstateConfig from "../../config/realEstateConfig";
import TimeManager from "../../classes/timeManager";

export default {
  date: TimeManager.hourly,
  execute: async (cache: Cache) => {
    Logger.success("Real Estate Market has been updated");
    const realEstateMarket = { ...cache.markets.realEstate };

    for (const realEstate of Object.values(RealEstate)) {
      const config = realEstateConfig[realEstate];

      const newPrice = calculateNextPrice(
        realEstateMarket[realEstate].price,
        config.basePrice,
        config.volatility
      );

      if (newPrice == realEstateMarket[realEstate].price) continue;

      realEstateMarket[realEstate].price = newPrice;
      realEstateMarket[realEstate].history.push({
        date: Date.now(),
        value: newPrice,
      });
    }

    cache.events.emit(EmitterValues.markets, {
      market: "realEstate",
      data: realEstateMarket,
    });

    cache.markets.realEstate = realEstateMarket;

    await markets.updateOne({
      realEstate: realEstateMarket,
    });
  },
} satisfies ScheduledTask;
