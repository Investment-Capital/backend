import { Client } from "discord.js";
import Command from "./command";
import Investor from "./investor";
import Markets from "./markets/markets";
import EventEmitter from "events";
import Route from "./route";
import UnsavedCache from "./unsavedCache";
import MarketGraphLengths from "../enum/marketGraphLengths";

type Cache = {
  investors: Investor[];
  commands: Command[];
  markets: Markets;
  events: EventEmitter;
  routes: Route[];
  client: Client;

  unsavedCache: UnsavedCache;
  marketGraphs: {
    [_ in keyof Markets]: { [time in MarketGraphLengths]: string };
  };
};

export default Cache;
