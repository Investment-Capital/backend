import DatabaseStatus from "../../types/databaseStatus";
import logger from "../../classes/logger";

export default {
  status: "error",
  execute: (error: Error) => logger.error(error),
} as DatabaseStatus;
