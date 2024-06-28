import { Request, Response } from "express";
import Route from "../../../types/route";
import publicInvestor from "../../../functions/publicInvestor";
import Cache from "../../../types/cache";

export default {
  path: "/investor/:id",
  method: "get",
  execute: (cache: Cache, req: Request, res: Response) => {
    const { id } = req.params;
    const investor = cache.investors.find((investor) => investor.user.id == id);

    if (!investor)
      return res.status(404).json({
        error: "Investor not found.",
      });

    if (investor.blacklist.blacklisted)
      return res.status(403).json({
        error: "Investor is blacklisted.",
      });

    res.json(publicInvestor(investor));
  },
} satisfies Route;
