import { Request, Response } from "express";
import Route from "../../../types/route";

export default {
  path: "/investors/:search",
  execute: (cache, req: Request, res: Response) => {
    const { search } = req.params;
    const users = cache.investors.filter(
      (e) =>
        e.user.displayName?.toLowerCase().includes(search.toLowerCase()) ||
        e.user.username?.toLowerCase().includes(search.toLowerCase()) ||
        e.user.id?.toLowerCase().includes(search.toLowerCase())
    );

    if (!users.length)
      return res.json({
        error: "No users found",
      });

    res.json(users.map((e) => e.user).slice(0, 10));
  },
} satisfies Route;
