import { Request, Response } from "express";
import Cache from "./cache";
import Investor from "./investor";

type RouteBase = {
  path: string;
  category?: string;
  ratelimit?: number;
  ratelimitDuration?: number;
};

type WebSocketRoute = RouteBase & {
  method: "ws";
} & (
    | {
        authorized: true;
        execute: (
          cache: Cache,
          investor: Investor,
          websocket: WebSocket,
          req: Request,
          res: Response
        ) => any;
      }
    | {
        authorized?: false;
        execute: (
          cache: Cache,
          websocket: WebSocket,
          req: Request,
          res: Response
        ) => any;
      }
  );

type HttpRoute = RouteBase & {
  method: "post" | "get";
} & (
    | {
        authorized: true;
        execute: (
          cache: Cache,
          investor: Investor,
          req: Request,
          res: Response
        ) => any;
      }
    | {
        authorized?: false;
        execute: (cache: Cache, req: Request, res: Response) => any;
      }
  );

type Route = WebSocketRoute | HttpRoute;

export default Route;
