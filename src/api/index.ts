import express, { Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Cache from "../types/cache";
import http from "http";
import fs from "fs";
import Route from "../types/route";
import enableWs from "express-ws";
import Logger from "../classes/logger";

dotenv.config();
const app = express();
const server = http.createServer(app);
enableWs(app, server);
app.use(
  cors({
    origin: "*",
  })
);

const startAPI = async (cache: Cache) => {
  Logger.info("Starting API.");

  for (const folder of fs.readdirSync("src/api/routes")) {
    for (const file of fs.readdirSync(`src/api/routes/${folder}`)) {
      const route: Route = (await import(`./routes/${folder}/${file}`)).default;

      (app as any)[folder](route.path, (...data: any) =>
        route.execute(cache, ...data)
      );
    }
  }

  app.get("*", (_, res: Response) =>
    res.json({
      error: "Route Not Found",
    })
  );

  server.listen(process.env.PORT, () =>
    Logger.success(`Running API at http://localhost:${process.env.PORT}`)
  );
};

export default startAPI;
