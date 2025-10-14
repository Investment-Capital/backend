import { config } from "dotenv";
import stockMarketHistory from "../../database/schemas/stockMarketHistory";
import ScheduledJob from "../../types/scheduledJob";
import stockConfig from "../../database/schemas/stockConfig";
import StockMarket from "../../classes/stockMarket";
import Logger from "../../classes/logger";
config();

export default {
  time: `*/5 * * * * *`,
  execute: async () => {
    const [configData, currentPrices] = await Promise.all([
      stockConfig.find(),
      StockMarket.prices(),
    ]);

    for (const config of configData) {
      const { name, id, priceChangeRange } = config;
      const currentPrice = currentPrices.find((data) => data.id == id)?.price;

      if (!currentPrice) {
        Logger.error(`No price found for stock name: ${name}, id: ${id}`);
        continue;
      }

      new stockMarketHistory({
        id,
        price:
          currentPrice +
          Math.random() * priceChangeRange * 2 -
          priceChangeRange,
        date: Date.now(),
      }).save();
    }
  },
} satisfies ScheduledJob;
