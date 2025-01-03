import { Response } from "express";
import Route from "../../../types/route";
import LeaderboardsConfig from "../../../config/leaderboardsConfig";
import LeaderboardsConfigType from "../../../types/config/leaderboardsConfig";

export default {
  path: "/config/leaderboard",
  method: "get",
  execute: (_, __, res: Response) =>
    res.json(
      Object.entries({ ...LeaderboardsConfig }).reduce(
        (prev: any, [key, value]) => {
          prev[key] = Object.keys(
            (value as LeaderboardsConfigType).leaderboards
          );

          return prev;
        },
        {}
      )
    ),
} satisfies Route;
