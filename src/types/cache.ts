import { Client } from "discord.js";
import Command from "./command";
import Components from "./components";
import Investor from "./investor";
import Markets from "./markets/markets";
import EventEmitter from "events";
import Route from "./route";

type Cache = {
  investors: Investor[];
  commands: Command[];
  components: Components;
  markets: Markets;
  events: EventEmitter;
  routes: Route[];
  client: Client;

  unsavedInvestors: string[];
};

export default Cache;
