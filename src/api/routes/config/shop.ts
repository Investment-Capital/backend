import shopConfig from "../../../config/shopConfig";
import Route from "../../../types/route";

export default {
  method: "get",
  path: "/config/shop",
  execute: (_, __, res) => res.json(shopConfig),
} satisfies Route;
