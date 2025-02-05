import { Response } from "express";
import Route from "../../../types/route";
import realEstateUpgradesConfig from "../../../config/realEstateUpgradesConfig";

export default {
  path: "/config/realEstateUpgrades",
  execute: (__, _, res: Response) => res.json(realEstateUpgradesConfig),
  method: "get",
} satisfies Route;
