import { Error } from "mongoose";
import DatabaseStatus from "../../types/databaseStatus";
import logger from "../../classes/logger";

export default {
  status: "error",
  execute: (error: Error) => {
    logger.error(error.message, error);
  },
} as DatabaseStatus;
