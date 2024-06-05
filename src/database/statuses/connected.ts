import Logger from "../../classes/logger";
import DatabaseStatus from "../../types/databaseStatus";

export default {
  status: "connected",
  execute: () => Logger.success("Connected to database"),
} satisfies DatabaseStatus;
