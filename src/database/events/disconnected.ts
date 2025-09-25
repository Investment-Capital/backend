import Logger from "../../classes/logger";
import DatabaseEvent from "../../types/databaseEvent";

export default {
  event: "disconnected",
  execute: () => Logger.warn("Disconnected from database"),
} satisfies DatabaseEvent;
