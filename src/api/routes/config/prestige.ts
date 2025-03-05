import prestigeConfig from "../../../config/prestigeConfig";
import Route from "../../../types/route";

export default {
  method: "get",
  path: "/config/prestige",
  execute: (_, __, res) => res.json(prestigeConfig),
} satisfies Route;
