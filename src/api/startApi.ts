import { config } from "dotenv";
import express, { json, NextFunction, Request, Response } from "express";
import Cache from "../types/cache";
import Logger from "../classes/logger";
import cors from "cors";
import path from "path";
import fs from "fs";
import Route from "../types/route";
config();

const startApi = async (cache: Cache) => {
  Logger.info("Starting API.");

  const app = express();

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

      app[route.method](route.path, async (req: Request, res: Response) => {
        if (route.authorized) {
          const investor = {};

          if (!investor)
            return res.status(404).json({
              error: "Unauthorized",
            });

          return await route.execute(cache, req, res, investor);
        }

        await route.execute(cache, req, res);
      });
    }
  }

  app.listen(process.env.PORT, () =>
    Logger.success(`Running API at http://localhost:${process.env.PORT}`)
  );
};

export default startApi;
