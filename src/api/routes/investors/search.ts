import investors from "../../../database/schemas/investors";
import Route from "../../../types/route";
import { config } from "dotenv";
config();

const MAX_PAGE_SIZE = parseInt(process.env.MAX_PAGE_SIZE as string);

export default {
  path: "/investors/search",
  method: "get",
  execute: async (_, req, res) => {
    const search = typeof req.query.search == "string" ? req.query.search : "";
    const page = Math.max(
      typeof req.query.page == "string" ? parseInt(req.query.page) : 1,
      1
    );

    const data = await investors
      .find({
        "account.profile.username": {
          $gte: search,
          $lt: search + "\uffff",
        },
      })
      .collation({ locale: "en", strength: 2 })
      .sort({
        created: 1,
      })
      .skip((page - 1) * MAX_PAGE_SIZE)
      .limit(MAX_PAGE_SIZE);

    if (data.length == 0)
      return res.json({
        error: "No investors from this search found",
      });

    res.json(data.map((investor) => investor.account.profile));
  },
} satisfies Route;
