import { Request, Response } from "express";
import Cache from "../../../types/cache";
import Route from "../../../types/route";
import LeaderboardConfig from "../../../config/leaderboardConfig";
import LeaderboardConfigType from "../../../types/config/leaderboardConfig";

export default {
  path: "/leaderboard/:type/:leaderboard",
  method: "get",
  execute: (cache: Cache, req: Request, res: Response) => {
    const page = parseInt((req.query.page as string | undefined) ?? "1");
    const { type, leaderboard } = req.params;

    if (!(type in LeaderboardConfig))
      return res.status(404).json({
        error: "Invalid leaderboard type",
      });

    if (page < 1)
      return res.status(404).json({
        error: "Invalid Page",
      });

    const leaderboardTypeConfig: LeaderboardConfigType =
      LeaderboardConfig[type as keyof LeaderboardConfig];

    const leaderboardConfig = leaderboardTypeConfig.leaderboards.find(
      (config) => config.name == leaderboard
    );

    if (!leaderboardConfig)
      return res.status(404).json({
        error: "Invalid Leaderboard for that type",
      });

    const dataSet = leaderboardTypeConfig.dataSet(cache);

    const leaderboardData = dataSet
      .sort(
        (a, b) => leaderboardConfig.getValue(b) - leaderboardConfig.getValue(a)
      )
      .slice((page - 1) * 10, page * 10)
      .map((data, index) => ({
        ...leaderboardTypeConfig.mapData(data),
        position: page * 10 - 9 + index,
        value: leaderboardConfig.getValue(data),
      }));

    if (!leaderboardData.length)
      return res.status(404).json({
        error: "No data found for this page",
      });

    res.json(leaderboardData);
  },
} satisfies Route;
