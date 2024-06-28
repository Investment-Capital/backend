import { Application, Response } from "express";
import Execute from "../../types/execute";
import cors from "cors";
import { json } from "express";

export default ((_, app: Application) => {
  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(json());

  app.use((error: any, _: any, res: Response, next: any) => {
    if (error.type == "entity.parse.failed")
      return res.json({
        error: "Invalid JSON body.",
      });

    next();
  });
}) satisfies Execute;
