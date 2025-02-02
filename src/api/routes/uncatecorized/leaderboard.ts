import { Request, Response } from "express";
import Cache from "../../../types/cache";
import Route from "../../../types/route";
import LeaderboardsConfig from "../../../config/leaderboardsConfig";
import getLeaderboardData from "../../../functions/getLeaderboardData";
import LeaderboardTypes from "../../../enum/leaderboardTypes";

export default {
  path: "/leaderboard/:type/:leaderboard",
  method: "get",
  execute: (cache: Cache, req: Request, res: Response) => {
    const page = parseInt((req.query.page as string | undefined) ?? "1");
    const { type, leaderboard } = req.params;

    if (!(type in LeaderboardsConfig))
      return res.status(404).json({
        error: "Invalid leaderboard type",
      });

    const configType = LeaderboardsConfig[type as LeaderboardTypes];

    if (!(leaderboard in configType.leaderboards))
      return res.status(404).json({
        error: "Invalid Leaderboard for that type",
      });

    const configLeaderboard = configType.leaderboards[leaderboard];

    if (page < 1)
      return res.status(404).json({
        error: "Invalid Page",
      });

    const leaderboardData = getLeaderboardData(
      configType.dataSet(cache),
      configLeaderboard.getValue,
      configType.mapData,
      page
    );

    if (!leaderboardData.length)
      return res.status(404).json({
        error: "No data found for this page",
      });

    res.json(leaderboardData);
  },
} satisfies Route;
