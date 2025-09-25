import Logger from "../../classes/logger";
import DatabaseEvent from "../../types/databaseEvent";

export default {
  event: "connected",
  execute: () => Logger.success("Connected to database"),
} satisfies DatabaseEvent;
