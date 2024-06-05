import Logger from "../../classes/logger";
import DatabaseStatus from "../../types/databaseStatus";

export default {
  status: "disconnected",
  execute: () => Logger.warn("Disconnected from database"),
} satisfies DatabaseStatus;
