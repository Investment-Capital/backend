import DatabaseStatus from "../../types/databaseStatus";
import Logger from "../../classes/logger";

export default {
  status: "error",
  execute: (error: Error) => Logger.error(error),
} satisfies DatabaseStatus;
