import { Request, Response } from "express";
import Cache from "./cache";
import Investor from "./investor";

type UnauthorizedHttpRoute = {
  authorized?: false;
  execute: (cache: Cache, req: Request, res: Response) => any;
};

type AuthorizedHttpRoute = {
  authorized: true;
  admin?: boolean;
  execute: (
    cache: Cache,
    req: Request,
    res: Response,
    investor: Investor
  ) => any;
};

type PostRoute = {
  method: "post";
  schema?: Record<string, any>;
};

type GetRoute = {
  method: "get";
};

type HttpRoute = { path: string } & (PostRoute | GetRoute) &
  (AuthorizedHttpRoute | UnauthorizedHttpRoute);

type WebSocketRoute = {
  method: "ws";
  path: string;
  event: string;
  authorized?: undefined;
  filter?: (cache: Cache, req: Request, data: any) => boolean;
  map?: (cache: Cache, req: Request, data: any) => any;
};

type Route = HttpRoute | WebSocketRoute;

export default Route;
