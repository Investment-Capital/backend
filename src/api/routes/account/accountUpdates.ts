import Route from "../../../types/route";
import Investor from "../../../types/investor";
import EmitterValues from "../../../classes/emitterValues";
import Cache from "../../../types/cache";

export default {
  path: "/account/updates",
  authorized: true,
  method: "ws",
  execute: (cache: Cache, investor: Investor, ws: WebSocket) => {
    const authorization = { ...investor }.authorization;

    const callback = (info: Investor) => {
      if (authorization == info.authorization) {
        ws.send(JSON.stringify(info));
      }
    };

    cache.events.on(EmitterValues.investorUpdate, callback);
    ws.addEventListener("close", () =>
      cache.events.off(EmitterValues.investorUpdate, callback)
    );
  },
} satisfies Route;
