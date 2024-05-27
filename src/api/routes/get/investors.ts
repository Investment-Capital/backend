import { Request, Response } from "express";
import Route from "../../../types/route";

export default {
  path: "/investors",
  execute: (cache, req: Request, res: Response) => {
    const search = (req.query.search as string) ?? "";
    const page = parseInt((req.query.page as string) ?? "1");

    if (page < 1)
      return res.json({
        error: "Invalid Page",
      });

    const users = cache.investors
      .filter(
        (e) =>
          e.user.displayName?.toLowerCase().includes(search.toLowerCase()) ||
          e.user.username.toLowerCase().includes(search.toLowerCase()) ||
          e.user.id.toLowerCase().includes(search.toLowerCase())
      )
      .slice((page - 1) * 10, page * 10);

    if (!users.length)
      return res.json({
        error: "No users found on this page",
      });

    res.json(users.map((e) => e.user));
  },
} satisfies Route;
