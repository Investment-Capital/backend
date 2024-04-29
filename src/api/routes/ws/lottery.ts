import emitterValues from "../../../classes/emitterValues";
import Route from "../../../types/route";

type CallbackType = (info: any) => void;

export default {
  path: "/lottery",
  execute: (cache, ws: WebSocket) => {
    const callback: CallbackType = (info) => ws.send(JSON.stringify(info));

    cache.events.on(emitterValues.lottery, callback);
    ws.addEventListener("close", () =>
      cache.events.off(emitterValues.lottery, callback)
    );
  },
} satisfies Route;
