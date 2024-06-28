import EmitterValues from "../../../classes/emitterValues";
import Cache from "../../../types/cache";
import Route from "../../../types/route";

export default {
  path: "/markets",
  method: "ws",
  execute: (cache: Cache, ws: WebSocket) => {
    const callback = (info: any) => ws.send(JSON.stringify(info));

    cache.events.on(EmitterValues.markets, callback);
    ws.addEventListener("close", () =>
      cache.events.off(EmitterValues.markets, callback)
    );
  },
} satisfies Route;
