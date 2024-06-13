import { Application, Request, Response } from "express";
import Execute from "../../types/execute";
import Route from "../../types/route";
import fs from "fs";

export default (async (cache, app: Application) => {
  for (const folder of fs.readdirSync("src/api/routes")) {
    for (const file of fs.readdirSync(`src/api/routes/${folder}`)) {
      const route: Route = (await import(`../routes/${folder}/${file}`))
        .default;

      (app as any)[folder](route.path, (...data: any[]) => {
        if (route.authorized) {
          const req: Request = data[folder == "ws" ? 1 : 0];
          const res: Response = data[folder == "ws" ? 2 : 1];

          const investor = cache.investors.find(
            (investor) => investor.authorization == req.headers.authorization
          );

          if (!investor)
            return res.status(404).json({
              error: "Unauthorized",
            });

          if (investor.blacklist.blacklisted)
            return res.status(403).json({
              error: "Blacklisted",
              reason: investor.blacklist.reason,
            });

          data.unshift(investor);
        }

        route.execute(cache, ...data);
      });
    }
  }
}) satisfies Execute;
