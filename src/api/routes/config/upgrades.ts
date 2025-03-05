import upgradesConfig from "../../../config/upgradesConfig";
import Route from "../../../types/route";

export default {
  path: "/config/upgrades",
  method: "get",
  execute: (_, __, res) => res.json(upgradesConfig),
} satisfies Route;
