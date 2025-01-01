import { Response } from "express";
import Route from "../../../types/route";
import stockConfig from "../../../config/stockConfig";

export default {
  path: "/config/stock",
  execute: (__, _, res: Response) => res.json(stockConfig),
  method: "get",
} satisfies Route;
