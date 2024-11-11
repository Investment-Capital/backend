import { Events } from "discord.js";
import Event from "../../types/event";
import Logger from "../../classes/logger";
import Cache from "../../types/cache";

export default {
  event: Events.ClientReady,
  once: true,
  execute: async (cache: Cache) => {
    Logger.success(`Logged into ${cache.client.user?.username}`);
    cache.client.application?.fetch();
    cache.client.application?.commands.fetch();
  },
} satisfies Event;
