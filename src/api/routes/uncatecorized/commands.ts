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
        category: command.config.category,
        disabled:
          typeof command.config.disabled == "function"
            ? command.config.disabled(cache)
            : command.config.disabled ?? false,
        requiedPrestige: command.config.requiedPrestige,
        global: command.config.guilds ? false : true,
        requiresAccount: command.config.requiresAccount,

        owner: command.config.owner,
        admin: command.config.admin,
      }))
    ),
} satisfies Route;
