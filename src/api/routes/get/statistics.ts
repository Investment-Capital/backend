import { Response } from "express";
import Route from "../../../types/route";

export default {
  path: "/statistics",
  execute: (cache, _, res: Response) =>
    res.json({
      investors: cache.investors.length,
      guilds: cache.client.guilds.cache.size,
      businesses: null,
    }),
} satisfies Route;
