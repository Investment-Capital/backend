import { Request, Response } from "express";
import Route from "../../../types/route";
import Cache from "../../../types/cache";

export default {
  path: "/market/:market",
  execute: (cache: Cache, req: Request, res: Response) => {
    const { market } = req.params;

    if (!(market in cache.markets))
      return res.json({
        error: "Invalid Market",
      });

    return res.json((cache.markets as any)[market]);
  },
  method: "get",
} satisfies Route;
