import Event from "../../types/event";
import Logger from "../../classes/logger";

export default {
  event: "error",
  execute: Logger.error,
} satisfies Event;
