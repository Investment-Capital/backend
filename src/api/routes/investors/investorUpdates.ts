import { Request } from "express";
import Route from "../../../types/route";
import Investor from "../../../types/investor";
import publicInvestor from "../../../functions/publicInvestor";
import EmitterValues from "../../../classes/emitterValues";
import Cache from "../../../types/cache";
import { isEqual } from "lodash";

export default {
  path: "/investor/:id",
  method: "ws",
  execute: (cache: Cache, ws: WebSocket, req: Request) => {
    const { id } = req.params;
    const investor = cache.investors.find((investor) => investor.user.id == id);

    if (!investor) return ws.close(1008, "Invalid user ID.");

    const callback = (info: Investor) => {
      if (
        investor.user.id == id &&
        !isEqual(publicInvestor(investor), publicInvestor(info))
      ) {
        ws.send(JSON.stringify(publicInvestor(info)));
      }
    };

    cache.events.on(EmitterValues.investorUpdate, callback);
    ws.addEventListener("close", () =>
      cache.events.off(EmitterValues.investorUpdate, callback)
    );
  },
} satisfies Route;
