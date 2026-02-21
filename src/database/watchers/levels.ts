import DatabaseWatcher from "../../types/databaseWatcher";
import levelConfig from "../schemas/levelConfig";

export default {
  model: levelConfig,
  execute: (cache, change) => {
    if (change.operationType == "insert" || change.operationType == "update")
      cache.events.emit("levels", change.fullDocument);
  },
} satisfies DatabaseWatcher;
