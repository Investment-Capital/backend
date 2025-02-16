import Route from "../../../types/route";

export default {
  path: "/account/role",
  authorized: true,
  method: "get",
  execute: (_, investor, __, res) => res.json(investor.role),
} satisfies Route;
