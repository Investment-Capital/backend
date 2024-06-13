import Route from "../../../types/route";
import Investor from "../../../types/investor";
import EmitterValues from "../../../classes/emitterValues";

export default {
  path: "/investor/update",
  authorized: true,
  execute: (cache, investor: Investor, ws: WebSocket) => {
    ws.send(JSON.stringify(investor));

    const callback = (info: Investor) => {
      if (investor.authorization == info.authorization)
        ws.send(JSON.stringify(info));
    };

    cache.events.on(EmitterValues.investorUpdate, callback);
    ws.addEventListener("close", () =>
      cache.events.off(EmitterValues.investorUpdate, callback)
    );
  },
} satisfies Route;
