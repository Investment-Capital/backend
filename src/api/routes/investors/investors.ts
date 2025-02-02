import { Request, Response } from "express";
import Route from "../../../types/route";
import Cache from "../../../types/cache";
import Times from "../../../classes/times";
import pageSize from "../../../config/pageSize";

export default {
  path: "/investors",
  method: "get",
  ratelimitDuration: Times.second * 5,
  ratelimit: 30,
  execute: (cache: Cache, req: Request, res: Response) => {
    const search = ((req.query.search as any) ?? "").toLowerCase();
    const page = parseInt((req.query.page as any) ?? "1");

    if (page < 1)
      return res.status(404).json({
        error: "Invalid Page",
      });

    const investors = cache.investors
      .filter(
        (investor) =>
          !investor.blacklist.blacklisted &&
          (investor.user.displayName.toLowerCase().includes(search) ||
            investor.user.username.toLowerCase().includes(search) ||
            investor.user.id.toLowerCase().includes(search))
      )
      .slice((page - 1) * pageSize, page * pageSize);

    if (!investors.length)
      return res.status(404).json({
        error: "No investors found on this page",
      });

    res.json(investors.map((investor) => investor.user));
  },
} satisfies Route;
