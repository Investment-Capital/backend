import { Request, Response } from "express";
import Cache from "./cache";
import Investor from "./investor";

type AuthorizedRoute = {
  authorized: true;
  admin?: boolean;
  method: "get" | "post";
  path: string;
  execute: (
    cache: Cache,
    req: Request,
    res: Response,
    investor: Investor
  ) => any;
};

type WebSocketRoute = {
  authorized?: undefined;
  method: "ws";
  event: string;
  filter?: (cache: Cache, req: Request, res: Response, data: any) => boolean;
  map?: (cache: Cache, req: Request, res: Response, data: any) => any;
};

type UnauthorizedRoute = {
  authorized?: false;
  method: "get" | "post";
  execute: (cache: Cache, req: Request, res: Response) => any;
};

type Route = {
  path: string;
} & (WebSocketRoute | UnauthorizedRoute | AuthorizedRoute);

export default Route;
