import { Response } from "express";
import Route from "../../../types/route";
import LeaderboardConfig from "../../../config/leaderboardConfig";
import LeaderboardConfigType from "../../../types/config/leaderboardConfig";

export default {
  path: "/config/leaderboards",
  method: "get",
  execute: (_, __, res: Response) =>
    res.json(
      Object.entries({ ...LeaderboardConfig }).reduce(
        (prev: any, [key, value]) => {
          prev[key] = (value as LeaderboardConfigType).leaderboards.map(
            (config) => config.name
          );

          return prev;
        },
        {}
      )
    ),
} satisfies Route;
