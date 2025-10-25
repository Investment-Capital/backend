import DatabaseWatcher from "../../types/databaseWatcher";
import investors from "../schemas/investors";

export default {
  model: investors,
  execute: (cache, change) => {
    if (change.operationType == "insert" || change.operationType == "update")
      cache.events.emit("investor", change.fullDocument);
  },
} satisfies DatabaseWatcher;
