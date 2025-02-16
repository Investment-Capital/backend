import Route from "../../../types/route";
import Investor from "../../../types/investor";
import EmitterValues from "../../../classes/emitterValues";

export default {
  path: "/account/updates",
  authorized: true,
  method: "ws",
  execute: (cache, investor, ws) => {
    const authorization = { ...investor }.authorization;

    const callback = (info: Investor) =>
      authorization == info.authorization && ws.send(JSON.stringify(info));

    cache.events.on(EmitterValues.investorUpdate, callback);
    ws.addEventListener("close", () =>
      cache.events.off(EmitterValues.investorUpdate, callback)
    );
  },
} satisfies Route;
