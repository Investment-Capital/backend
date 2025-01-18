import { Response } from "express";
import Cache from "../../../types/cache";
import Route from "../../../types/route";

export default {
  method: "get",
  path: "/routes",
  execute: (cache: Cache, _, res: Response) =>
    res.json(
      cache.routes.map((route) => ({
        method: route.method,
        authorized: route.authorized ?? false,
        path: route.path,
        category: route.category,
        ratelimit: route.ratelimit,
        ratelimitDuration: route.ratelimitDuration,
      }))
    ),
} satisfies Route;
