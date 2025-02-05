import { Response } from "express";
import Route from "../../../types/route";
import stocksConfig from "../../../config/stocksConfig";

export default {
  path: "/config/stocks",
  execute: (__, _, res: Response) => res.json(stocksConfig),
  method: "get",
} satisfies Route;
