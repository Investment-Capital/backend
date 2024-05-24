import { Client } from "discord.js";
import Command from "./command";
import Components from "./components";
import Investor from "./investor";
import Markets from "./markets/markets";
import { EventEmitter } from "events";

type Cache = {
  investors: Investor[];
  commands: Command[];
  components: Components;
  markets: Markets;
  events: EventEmitter;

  client: Client;
};

export default Cache;
