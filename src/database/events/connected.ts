import Logger from "../../classes/logger";
import Event from "../../types/event";

export default {
  event: "connected",
  execute: () => Logger.success("Connected to database"),
} satisfies Event;
