import { Response } from "express";
import Route from "../../../types/route";

export default {
  path: "/commands",
  execute: (cache, _, res: Response) => {
    res.json(
      cache.commands.map((e) => ({
        data: e.data,
        category: e.category,
        disabled: typeof e.disabled == "function" ? e.disabled() : e.disabled,
        requiedPrestige: e.requiedPrestige,
        global: e.guilds ? false : true,
      }))
    );
  },
} satisfies Route;
