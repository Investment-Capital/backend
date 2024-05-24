import { Events } from "discord.js";
import Event from "../../types/event";
import logger from "../../classes/logger";

export default {
  event: Events.ClientReady,
  once: true,
  execute: (cache) =>
    logger.success(`Logged into ${cache.client.user?.username}`),
} satisfies Event;
