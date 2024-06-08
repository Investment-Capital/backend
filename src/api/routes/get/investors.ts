import { Request, Response } from "express";
import Route from "../../../types/route";

export default {
  path: "/investors",
  execute: (cache, req: Request, res: Response) => {
    const search = (
      (req.query.search as string | undefined) ?? ""
    ).toLowerCase();
    const page = parseInt((req.query.page as string | undefined) ?? "1");

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
      .slice((page - 1) * 10, page * 10);

    if (!investors.length)
      return res.status(404).json({
        error: "No investors found on this page",
      });

    res.json(investors.map((investor) => investor.user));
  },
} satisfies Route;
