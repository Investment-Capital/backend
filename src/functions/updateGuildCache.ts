import { Client } from "discord.js";
import Cache from "../types/cache";

const updateGuildCache = (cache: Cache, client: Client): void => {
  cache.guilds = client.guilds.cache.size;
};

export default updateGuildCache;
