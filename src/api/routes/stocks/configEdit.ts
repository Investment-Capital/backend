import Route from "../../../types/route";

export default {
  path: "/stocks/config/:stock",
  method: "post",
  authorized: true,
  admin: true,
  execute: (_, req, res) => {
    const { stock } = req.query;
    res.json({
      stock,
    });
  },
} satisfies Route;
