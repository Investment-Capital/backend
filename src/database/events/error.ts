import Event from "../../types/event";
import Logger from "../../classes/logger";

export default {
  event: "error",
  execute: (error: Error) => Logger.error(error),
} satisfies Event;
