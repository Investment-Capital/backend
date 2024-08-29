import { Request, Response } from "express";
import Route from "../../../types/route";
import Cache from "../../../types/cache";
import publicInvestor from "../../../functions/publicInvestor";

export default {
  path: "/investors",
  method: "post",
  execute: (cache: Cache, req: Request, res: Response) => {
    const { investors } = req.body;

    if (!investors)
      return res.json({
        error: "Investors proporty has not been filled out.",
      });

    if (!Array.isArray(investors))
      return res.json({
        error: "Investors proporty is not an array.",
      });

    if (investors.length == 0)
      return res.json({
        error: "No investors provided.",
      });

    if (investors.length > 5)
      return res.json({
        error: "You can only lookup 5 investors per request.",
      });

    const invalidIds: string[] = [];
    const foundInvestors = investors.map((investor) => {
      const foundCache = cache.investors.find(
        (cachedInvestor) => cachedInvestor.user.id == investor
      );

      if (foundCache) return publicInvestor(foundCache);
      invalidIds.push(investor);
    });

    if (invalidIds.length > 0)
      return res.json({
        error: `Invalid Investor IDs: ${invalidIds.join(", ")}`,
      });

    res.json(foundInvestors);
  },
} satisfies Route;
