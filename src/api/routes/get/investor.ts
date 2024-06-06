import { Request, Response } from "express";
import Route from "../../../types/route";
import Investor from "../../../types/investor";

export default {
  path: "/investor/:id",
  execute: (cache, req: Request, res: Response) => {
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

    const response: Partial<Investor> = { ...investor };
    delete response.blacklist;
    delete response.authorization;

    res.json(response);
  },
} satisfies Route;
