import { Events } from "discord.js";
import Event from "../../types/event";
import Logger from "../../classes/logger";

export default {
  event: Events.ClientReady,
  once: true,
  execute: (cache) =>
    Logger.success(`Logged into ${cache.client.user?.username}`),
} satisfies Event;
