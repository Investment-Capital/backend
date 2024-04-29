import logger from "../../classes/logger";
import DatabaseStatus from "../../types/databaseStatus";

export default {
  status: "disconnected",
  execute: () => logger.warn("Disconnected from database"),
} as DatabaseStatus;
