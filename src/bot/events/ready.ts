import { Events } from "discord.js";
import Event from "../../types/event";
import Logger from "../../classes/logger";

export default {
  event: Events.ClientReady,
  once: true,
  execute: async (cache) => {
    Logger.success(`Logged into ${cache.client.user?.username}`),
      await cache.client.application?.fetch();
  },
} satisfies Event;
