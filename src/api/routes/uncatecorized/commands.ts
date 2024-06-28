import { Response } from "express";
import Route from "../../../types/route";
import Cache from "../../../types/cache";

export default {
  path: "/commands",
  method: "get",
  execute: (cache: Cache, _, res: Response) =>
    res.json(
      cache.commands.map((command) => ({
        data: command.data,
        category: command.category,
        disabled:
          typeof command.disabled == "function"
            ? command.disabled(cache)
            : command.disabled ?? false,
        requiedPrestige: command.requiedPrestige,
        global: command.guilds ? false : true,
        requiresAccount: command.requiresAccount,

        owner: command.owner,
        admin: command.admin,
      }))
    ),
} satisfies Route;
