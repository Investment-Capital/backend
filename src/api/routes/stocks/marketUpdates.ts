import Route from "../../../types/route";

export default {
  method: "ws",
  event: "stockMarket",
  path: "/stocks/marketUpdates",
} satisfies Route;
