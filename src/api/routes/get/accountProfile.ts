import { Response } from "express";
import Route from "../../../types/route";
import Investor from "../../../types/investor";

export default {
  path: "/account/profile",
  authorised: true,
  execute: (_, investor: Investor, __, res: Response) => res.json(investor),
} satisfies Route;
