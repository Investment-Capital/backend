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
  guilds: number | null;
  events: EventEmitter;
};

export default Cache;
