import { Response } from "express";
import Route from "../../../types/route";
import Cache from "../../../types/cache";

export default {
  path: "/statistics",
  method: "get",
  execute: (cache: Cache, _, res: Response) =>
    res.json({
      investors: cache.investors.length,
      guilds: cache.client.guilds.cache.size,
      businesses: null,
    }),
} satisfies Route;
