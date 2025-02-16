import Route from "../../../types/route";
import Investor from "../../../types/investor";
import publicInvestor from "../../../functions/publicInvestor";
import EmitterValues from "../../../classes/emitterValues";

export default {
  path: "/investor/:id",
  method: "ws",
  execute: (cache, ws, req) => {
    const { id } = req.params;
    const investor = cache.investors.find((investor) => investor.user.id == id);

    if (!investor) return ws.close(1008, "Invalid user ID.");
    if (investor.blacklist.blacklisted)
      return ws.close(1008, "Invalid is blacklisted.");

    const callback = (info: Investor) =>
      info.user.id == id && ws.send(JSON.stringify(publicInvestor(info)));

    cache.events.on(EmitterValues.investorUpdate, callback);
    ws.addEventListener("close", () =>
      cache.events.off(EmitterValues.investorUpdate, callback)
    );
  },
} satisfies Route;
