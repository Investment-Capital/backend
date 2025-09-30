import { config } from "dotenv";
import stockMarketHistory from "../../database/schemas/stockMarketHistory";
import ScheduledJob from "../../types/scheduledJob";
import stockConfig from "../../database/schemas/stockConfig";
import StockMarket from "../../classes/stockMarket";
config();

export default {
  time: `*/${process.env.STOCKS_CHANGE_TIME} * * * * *`,
  execute: async () => {
    const [configData, currentPrices] = await Promise.all([
      stockConfig.find(),
      StockMarket.currentPrices(),
    ]);

    for (const config of configData) {
      const { name, defaultPrice, priceChangeRange } = config;

      const currentPrice =
        currentPrices.find((data) => data.stock == name)?.price ?? defaultPrice;
      const newPrice =
        Math.max(currentPrice, defaultPrice / 2) +
        Math.random() * priceChangeRange * 2 -
        priceChangeRange;

      new stockMarketHistory({
        stock: name,
        price: newPrice,
        date: Date.now(),
      }).save();
    }
  },
} satisfies ScheduledJob;
