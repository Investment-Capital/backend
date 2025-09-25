import Logger from "../../classes/logger";
import DatabaseEvent from "../../types/databaseEvent";

export default {
  event: "error",
  execute: Logger.error,
} satisfies DatabaseEvent;
