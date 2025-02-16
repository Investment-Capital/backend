import Route from "../../../types/route";

export default {
  path: "/commands",
  method: "get",
  execute: (cache, _, res) =>
    res.json(
      cache.commands.map((command) => ({
        data: command.data,
        category: command.category,
      }))
    ),
} satisfies Route;
