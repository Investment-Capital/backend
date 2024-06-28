import Logger from "../../classes/logger";
import Event from "../../types/event";

export default {
  event: "disconnected",
  execute: () => Logger.warn("Disconnected from database"),
} satisfies Event;
