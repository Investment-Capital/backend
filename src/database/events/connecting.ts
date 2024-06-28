import Logger from "../../classes/logger";
import Event from "../../types/event";

export default {
  event: "connecting",
  execute: () => Logger.info("Connecting to database"),
} satisfies Event;
