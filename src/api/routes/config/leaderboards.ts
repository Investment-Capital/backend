import { Response } from "express";
import Route from "../../../types/route";
import leaderboardsConfig from "../../../config/leaderboardsConfig";
import LeaderboardsConfigType from "../../../types/config/leaderboardsConfig";

export default {
  path: "/config/leaderboard",
  method: "get",
  execute: (_, __, res: Response) =>
    res.json(
      Object.entries(leaderboardsConfig).reduce((prev: any, [key, value]) => {
        prev[key] = Object.keys(
          (value as LeaderboardsConfigType[string]).leaderboards
        );

        return prev;
      }, {})
    ),
} satisfies Route;
