import { Client } from "discord.js";
import Command from "./command";
import Components from "./components";
import Investor from "./investor";
import Markets from "./markets/markets";
import EventEmitter from "events";
import Route from "./route";
import UnsavedCache from "./unsavedCache";

type Cache = {
  investors: Investor[];
  commands: Command[];
  components: Components;
  markets: Markets;
  events: EventEmitter;
  routes: Route[];
  client: Client;

  unsavedCache: UnsavedCache;
};

export default Cache;
