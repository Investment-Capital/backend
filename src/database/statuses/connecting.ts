import logger from "../../classes/logger";
import DatabaseStatus from "../../types/databaseStatus";

export default {
  status: "connecting",
  execute: () => logger.info("Connecting to database"),
} as DatabaseStatus;
