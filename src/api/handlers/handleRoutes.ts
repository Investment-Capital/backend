import { Application, Request, Response } from "express";
import Execute from "../../types/execute";
import Route from "../../types/route";
import fs from "fs";
import Cache from "../../types/cache";
import Times from "../../classes/times";

export default (async (cache: Cache, app: Application) => {
  for (const folder of fs.readdirSync("src/api/routes")) {
    for (const file of fs.readdirSync(`src/api/routes/${folder}`)) {
      const route: Route = (await import(`../routes/${folder}/${file}`))
        .default;

      if (!route.category) route.category = folder;
      if (!route.ratelimit) route.ratelimit = 5;
      if (!route.ratelimitDuration) route.ratelimitDuration = Times.second * 10;

      cache.routes.push(route);

      let requests: any[] = [];

      setInterval(() => {
        requests = [];
      }, route.ratelimitDuration);

      (app as any)[route.method](route.path, (...data: any[]) => {
        const req: Request = data[route.method == "ws" ? 1 : 0];
        const res: Response = data[route.method == "ws" ? 2 : 1];

        const foundRequests = requests.filter((ip) => req.ip == ip);

        if (foundRequests.length > (route as Required<Route>).ratelimit)
          return res.json({
            error: "You've been ratelimited.",
          });

        if (route.authorized) {
          let ws: WebSocket | null = null;
          if (route.method == "ws") ws = data[0];

          const investor = cache.investors.find(
            (investor) => investor.authorization == req.headers.authorization
          );

          if (!investor) {
            route.method == "ws" && ws
              ? ws.close(1008, `Unauthorized.`)
              : res.status(404).json({
                  error: "Unauthorized.",
                });
            return;
          }

          if (investor.blacklist.blacklisted) {
            route.method == "ws" && ws
              ? ws.close(
                  1008,
                  `You're blacklisted. Reason: ${investor.blacklist.reason}`
                )
              : res.status(403).json({
                  error: "You're blacklisted.",
                  reason: investor.blacklist.reason,
                });
            return;
          }

          data.unshift(investor);
        }

        requests.push(req.ip);

        route.execute(cache, ...data);
      });
    }
  }
}) satisfies Execute;
