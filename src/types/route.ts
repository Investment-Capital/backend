import { Request, Response } from "express";
import Cache from "./cache";
import Investor from "./investor";

type AuthorizedRoute = {
  authorized: true;
  execute: (
    cache: Cache,
    req: Request,
    res: Response,
    investor: Investor
  ) => any;
};

type UnauthorizedRoute = {
  authorized?: false;
  execute: (cache: Cache, req: Request, res: Response) => any;
};

type Route = {
  method: "post" | "get";
  path: string;
} & (UnauthorizedRoute | AuthorizedRoute);

export default Route;
