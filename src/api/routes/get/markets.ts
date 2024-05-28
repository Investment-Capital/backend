import { Response } from "express";
import Route from "../../../types/route";

export default {
  path: "/markets",
  execute: (cache, _, res: Response) => res.json(cache.markets),
} satisfies Route;
