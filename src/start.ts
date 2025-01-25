import startAPI from "./api";
import startBot from "./bot";
import Cache from "./types/cache";
import startDatabase from "./database/startDatabase";
import EventEmitter from "events";
import scheduleTasks from "./scheduledTasks/scheduleTasks";
import { Client } from "discord.js";

(async () => {
  const data = await startDatabase();

  const cache: Cache = {
    investors: data.investorData,
    commands: [],
    markets: data.marketData,
    events: new EventEmitter(),
    client: new Client({
      intents: [],
      shards: "auto",
    }),
    routes: [],
    unsavedCache: {
      investors: [],
    },
  };

  startBot(cache);
  startAPI(cache);
  scheduleTasks(cache);
})();
