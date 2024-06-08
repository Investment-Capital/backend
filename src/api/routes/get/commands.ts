import { Response } from "express";
import Route from "../../../types/route";

export default {
  path: "/commands",
  execute: (cache, _, res: Response) =>
    res.json(
      cache.commands.map((command) => ({
        data: command.data,
        category: command.category,
        disabled:
          typeof command.disabled == "function"
            ? command.disabled(cache)
            : command.disabled ?? false,
        requiedPrestige: command.requiedPrestige ?? 1,
        global: command.guilds ? false : true,
        requiresAccount:
          command.requiresAccount == undefined ? true : command.requiresAccount,
      }))
    ),
} satisfies Route;
