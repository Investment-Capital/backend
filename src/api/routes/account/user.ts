import Route from "../../../types/route";

export default {
  path: "/account/user",
  authorized: true,
  method: "get",
  execute: (_, investor, __, res) => res.json(investor.user),
} satisfies Route;
