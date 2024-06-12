import EmitterValues from "../../../classes/emitterValues";
import Route from "../../../types/route";

export default {
  path: "/markets",
  execute: (cache, ws: WebSocket) => {
    const callback = (info: any) => ws.send(JSON.stringify(info));

    cache.events.on(EmitterValues.markets, callback);
    ws.addEventListener("close", () =>
      cache.events.off(EmitterValues.markets, callback)
    );
  },
} satisfies Route;
