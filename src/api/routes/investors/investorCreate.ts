import EmitterValues from "../../../classes/emitterValues";
import publicInvestor from "../../../functions/publicInvestor";
import Cache from "../../../types/cache";
import Investor from "../../../types/investor";
import Route from "../../../types/route";

export default {
  path: "/investor/create",
  method: "ws",
  execute: (cache: Cache, ws: WebSocket) => {
    const callback = (info: Investor) =>
      ws.send(JSON.stringify(publicInvestor(info)));

    cache.events.on(EmitterValues.investorCreate, callback);
    ws.addEventListener("close", () =>
      cache.events.off(EmitterValues.investorCreate, callback)
    );
  },
} satisfies Route;
