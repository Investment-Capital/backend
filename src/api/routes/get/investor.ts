import { Request, Response } from "express";
import Route from "../../../types/route";
import Investor from "../../../types/investor";

export default {
  path: "/investor/:id",
  execute: (cache, req: Request, res: Response) => {
    const { id } = req.params;
    const investor = cache.investors.find((investor) => investor.user.id == id);

    if (!investor)
      return res.json({
        error: "Investor not found.",
      });

    if (investor.blacklist.blacklisted)
      return res.json({
        error: "Investor is blacklisted.",
      });

    const response: Partial<Investor> = { ...investor };
    delete response.blacklist;

    res.json(response);
  },
} satisfies Route;
