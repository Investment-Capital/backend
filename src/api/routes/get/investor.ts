import { Request, Response } from "express";
import Route from "../../../types/route";

export default {
  path: "/investor/:id",
  execute: (cache, req: Request, res: Response) => {
    const { id } = req.params;
    const user = cache.investors.find((e) => e.user.id == id);

    if (!user)
      return res.json({
        error: "User not found.",
      });
    res.json(user);
  },
} satisfies Route;
