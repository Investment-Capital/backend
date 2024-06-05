import { Events } from "discord.js";
import Event from "../../types/event";
import Logger from "../../classes/logger";

export default {
  event: Events.Error,
  execute: (_, error: Error) => Logger.error(error),
} satisfies Event;
