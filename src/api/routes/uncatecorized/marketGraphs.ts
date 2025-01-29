import { Response } from "express";
import Cache from "../../../types/cache";
import Route from "../../../types/route";

export default {
  method: "get",
  path: "/marketGraphs",
  execute: (cache: Cache, _, res: Response) => res.json(cache.marketGraphs),
} satisfies Route;
