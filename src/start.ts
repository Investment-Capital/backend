import startAPI from "./api";
import startBot from "./bot";
import Cache from "./types/cache";
import dotenv from "dotenv";
import startDatabase from "./database/startDatabase";
import { EventEmitter } from "events";
import StockMarket from "./types/markets/stockMarket";
import schedualTasks from "./schedualedTasks/schedualTasks";
dotenv.config();

(async () => {
  const data = await startDatabase();

  const cache: Cache = {
    investors: data.investorData.investors,
    commands: [],
    components: {
      buttons: [],
      stringSelectMenus: [],
      modals: [],
      userSelectMenus: [],
    },
    markets: {
      stocks: data.marketData.stocks as StockMarket,
    },

    guilds: null,
    events: new EventEmitter(),
  };

  startBot(cache);
  startAPI(cache);
  schedualTasks(cache);
})();
