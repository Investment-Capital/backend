import Route from "../../../types/route";

export default {
  method: "get",
  path: "/marketGraphs",
  execute: (cache, _, res) => res.json(cache.marketGraphs),
} satisfies Route;
