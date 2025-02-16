import Route from "../../../types/route";

export default {
  path: "/statistics",
  method: "get",
  execute: (cache, _, res) =>
    res.json({
      investors: cache.investors.length,
      guilds: cache.client.guilds.cache.size,
      businesses: null,
    }),
} satisfies Route;
