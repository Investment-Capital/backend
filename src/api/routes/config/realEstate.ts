import { Response } from "express";
import Route from "../../../types/route";
import realEstateConfig from "../../../config/realEstateConfig";

export default {
  path: "/config/realEstate",
  execute: (__, _, res: Response) => res.json(realEstateConfig),
  method: "get",
} satisfies Route;
