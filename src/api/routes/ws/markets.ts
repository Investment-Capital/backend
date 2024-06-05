import EmitterValues from "../../../classes/emitterValues";
import Route from "../../../types/route";

type CallbackType = (info: any) => void;

export default {
  path: "/markets",
  execute: (cache, ws: WebSocket) => {
    const callback: CallbackType = (info) => ws.send(JSON.stringify(info));

    cache.events.on(EmitterValues.markets, callback);
    ws.addEventListener("close", () =>
      cache.events.off(EmitterValues.markets, callback)
    );
  },
} as Route;
