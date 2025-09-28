import { Request, Response } from "express";
import Cache from "./cache";
import Investor from "./investor";

type AuthorizedRoute = {
  authorized: true;
  method: "get" | "post";
  execute: (
    cache: Cache,
    req: Request,
    res: Response,
    investor: Investor
  ) => any;
};

type UnauthorizedWebSocketRoute = {
  authorized?: false;
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
} & (UnauthorizedWebSocketRoute | UnauthorizedRoute | AuthorizedRoute); // authorized websocket soon

export default Route;
