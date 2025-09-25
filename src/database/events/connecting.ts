import Logger from "../../classes/logger";
import DatabaseEvent from "../../types/databaseEvent";

export default {
  event: "connecting",
  execute: () => Logger.info("Connecting to database"),
} satisfies DatabaseEvent;
