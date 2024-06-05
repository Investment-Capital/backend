import Logger from "../../classes/logger";
import DatabaseStatus from "../../types/databaseStatus";

export default {
  status: "connecting",
  execute: () => Logger.info("Connecting to database"),
} satisfies DatabaseStatus;
