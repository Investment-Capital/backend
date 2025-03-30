import Route from "../../../types/route";
import leaderboardsConfig from "../../../config/leaderboardsConfig";

export default {
  path: "/config/leaderboards",
  method: "get",
  execute: (_, __, res) =>
    res.json(
      Object.entries(leaderboardsConfig).reduce((prev: any, [key, value]) => {
        prev[key] = Object.keys(value.leaderboards);
        return prev;
      }, {})
    ),
} satisfies Route;
