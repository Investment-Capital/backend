import DatabaseWatcher from "../../types/databaseWatcher";
import stockMarketHistory from "../schemas/stockMarketHistory";

export default {
  model: stockMarketHistory,
  execute: (cache, change) => {
    if (change.operationType == "insert")
      cache.events.emit("stockMarket", change.fullDocument);
  },
} satisfies DatabaseWatcher;
