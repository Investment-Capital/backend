import EmitterValues from "../../../classes/emitterValues";
import Route from "../../../types/route";

export default {
  path: "/lottery",
  execute: (cache, ws: WebSocket) => {
    const callback = (info: any) => ws.send(JSON.stringify(info));

    cache.events.on(EmitterValues.lottery, callback);
    ws.addEventListener("close", () =>
      cache.events.off(EmitterValues.lottery, callback)
    );
  },
} satisfies Route;
