import Route from "../../../types/route";

export default {
  path: "/market/:market",
  execute: (cache, req, res) => {
    const { market } = req.params;

    if (!(market in cache.markets))
      return res.json({
        error: "Invalid Market",
      });

    return res.json((cache.markets as any)[market]);
  },
  method: "get",
} satisfies Route;
