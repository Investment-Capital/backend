import Route from "../../../types/route";

export default {
  method: "ws",
  event: "stocks",
  path: "/stocks/updates",
} satisfies Route;
