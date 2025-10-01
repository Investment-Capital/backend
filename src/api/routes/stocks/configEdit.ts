import z from "zod";
import Route from "../../../types/route";

export default {
  path: "/stocks/config/:stock",
  method: "post",
  authorized: true,
  admin: true,
  schema: {
    soap: z.number(),
  },
  execute: (_, req, res) => {
    const { stock } = req.params;

    res.json({
      stock,
    });
  },
} satisfies Route;
