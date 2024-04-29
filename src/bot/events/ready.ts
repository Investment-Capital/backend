import { Client, Events } from "discord.js";
import Event from "../../types/event";
import logger from "../../classes/logger";
import updateGuildCache from "../../functions/updateGuildCache";
import updateInvestorUsers from "../../functions/updateInvestorUsers";

export default {
  event: Events.ClientReady,
  once: true,
  execute: (cache, client: Client) => {
    logger.success(`Logged into ${client.user?.username}`);

    updateGuildCache(cache, client);
    setInterval(() => updateGuildCache(cache, client), 60_000);
    setInterval(() => updateInvestorUsers(cache, client), 960_000);
  },
} satisfies Event;
