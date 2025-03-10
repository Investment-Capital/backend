import Route from "../../../types/route";

export default {
  path: "/account/data",
  authorized: true,
  execute: (_, investor, __, res) => res.json(investor),
  method: "get",
} satisfies Route;
