import startAPI from "./api";
import startBot from "./bot";
import Cache from "./types/cache";
import startDatabase from "./database/startDatabase";
import EventEmitter from "events";
import scheduleTasks from "./scheduledTasks/scheduleTasks";
import { Client } from "discord.js";
import generateMarketGraphs from "./functions/generateMarketGraphs";
import Markets from "./enum/markets";

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
    marketGraphs: await Promise.all(
      Object.values(Markets).map(async (name) => {
        const marketData = data.marketData[name];
        return { [name]: await generateMarketGraphs(marketData) };
      })
    ).then((entries) => Object.assign({}, ...entries)),
  };

  startBot(cache);
  startAPI(cache);
  scheduleTasks(cache);
})();
