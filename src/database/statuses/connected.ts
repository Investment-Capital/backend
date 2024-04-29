import logger from "../../classes/logger";
import DatabaseStatus from "../../types/databaseStatus";

export default {
  status: "connected",
  execute: () => logger.success("Connected to database"),
} as DatabaseStatus;
