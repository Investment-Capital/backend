import { Response } from "express";
import Route from "../../../types/route";
import InvestmentConfig from "../../../config/investmentConfig";

export default {
  path: "/config/investments",
  execute: (__, _, res: Response) => res.json({ ...InvestmentConfig }),
  method: "get",
} satisfies Route;
