import { Events } from "discord.js";
import Event from "../../types/event";
import logger from "../../classes/logger";

export default {
  event: Events.Error,
  execute: (_, error: Error) => logger.error(error),
} satisfies Event;
