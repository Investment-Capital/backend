import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Cache from "../types/cache";
import http from "http";
import fs from "fs";
import enableWs from "express-ws";
import Logger from "../classes/logger";
import Execute from "../types/execute";

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

  for (const file of fs.readdirSync("src/api/handlers")) {
    const handler: Execute = (await import(`./handlers/${file}`)).default;
    handler(cache, app);
  }

  server.listen(process.env.PORT, () =>
    Logger.success(`Running API at http://localhost:${process.env.PORT}`)
  );
};

export default startAPI;
