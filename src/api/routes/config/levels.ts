import levelsConfig from "../../../config/levelsConfig";
import Route from "../../../types/route";

export default {
  method: "get",
  path: "/config/levels",
  execute: (_, __, res) => res.json(levelsConfig),
} satisfies Route;
