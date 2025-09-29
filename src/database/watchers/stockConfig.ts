import DatabaseWatcher from "../../types/databaseWatcher";
import stockConfig from "../schemas/stockConfig";

export default {
  model: stockConfig,
  execute: (cache, change) => {
    if (change.operationType == "insert" || change.operationType == "update")
      cache.events.emit("stocks", {
        type: "config",
        data: change.fullDocument,
      });
  },
} satisfies DatabaseWatcher;
