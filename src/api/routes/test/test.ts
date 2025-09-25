import Route from "../../../types/route";

export default {
  method: "get",
  path: "/test",
  execute: (_, __, res) =>
    res.json({
      message: "test",
    }),
} satisfies Route;
