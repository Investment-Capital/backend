import { config } from "dotenv";
import express, { json, NextFunction, Request, Response } from "express";
import Cache from "../types/cache";
import Logger from "../classes/logger";
import cors from "cors";
import path from "path";
import fs from "fs";
import Route from "../types/route";
import http from "http";
import enableWs from "express-ws";
import z from "zod";
import investors from "../database/schemas/investors";
config();

const startApi = async (cache: Cache) => {
  Logger.info("Starting API.");

  const expressApp = express();
  const server = http.createServer(expressApp);
  const app = enableWs(expressApp, server).app;

  app.set("trust proxy", true);
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(json());
  app.use((error: any, _: any, res: Response, next: NextFunction) => {
    if (error.type == "entity.parse.failed")
      return res.json({
        error: "Invalid JSON body",
      });

    next();
  });

  for (const folder of fs.readdirSync(path.join(__dirname, "../api/routes"))) {
    for (const file of fs.readdirSync(
      path.join(__dirname, `../api/routes/${folder}`)
    )) {
      const route: Route = (await import(`../api/routes/${folder}/${file}`))
        .default;

      (app as any)[route.method](route.path, async (...data: any[]) => {
        const req: Request = data[route.method == "ws" ? 1 : 0];
        const res: Response = data[route.method == "ws" ? 2 : 1];

        if (route.method == "post" && route.schema) {
          const validate = z.strictObject(route.schema).safeParse(req.body);

          if (validate.error)
            return res.json({
              error: `Error in body schema: ${validate.error}`,
            });
        }

        if (route.method == "ws") {
          const websocket: WebSocket = data[0];

          const callback = (data: any) => {
            if (
              typeof route.filter == "function" &&
              !route.filter(cache, req, data)
            )
              return;

            websocket.send(
              typeof route.map == "function"
                ? route.map(cache, req, data)
                : JSON.stringify(data)
            );
          };

          cache.events.addListener(route.event, callback);
          return websocket.addEventListener("close", () =>
            cache.events.off(route.event, callback)
          );
        }

        if ("authorized" in route && route.authorized) {
          const { authorization } = req.headers;

          const investor = await investors.findOne(
            {
              "account.infomation.authorization": authorization,
            },
            {
              _id: 0,
              __v: 0,
            }
          );

          if (!investor)
            return res.status(404).json({
              error: "Unauthorized",
            });

          if (route.admin && !investor.admin)
            return res.status(404).json({
              error: "Invalid Permissions, route requires admin",
            });

          return await route.execute(cache, req, res, investor.toObject());
        }

        await route.execute(cache, req, res);
      });
    }
  }

  server.listen(process.env.PORT, () =>
    Logger.success(`Running API at http://localhost:${process.env.PORT}`)
  );
};

export default startApi;
