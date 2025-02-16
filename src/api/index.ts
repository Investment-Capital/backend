import express, { json, NextFunction, Response } from "express";
import dotenv from "dotenv";
import Cache from "../types/cache";
import http from "http";
import fs from "fs";
import enableWs from "express-ws";
import Logger from "../classes/logger";
import cors from "cors";
import path from "path";

dotenv.config();

const startAPI = async (cache: Cache) => {
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
        error: "Invalid JSON body.",
      });

    next();
  });

  const server = http.createServer(app);
  enableWs(app, server);

  for (const file of fs.readdirSync(path.join(__dirname, "./handlers"))) {
    const handler = (await import(`./handlers/${file}`)).default;
    handler(cache, app);
  }

  server.listen(process.env.PORT, () =>
    Logger.success(`Running API at http://localhost:${process.env.PORT}`)
  );
};

export default startAPI;
