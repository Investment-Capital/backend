import investors from "../../../database/schemas/investors";
import Route from "../../../types/route";

export default {
  path: "/investors/lookup/:id",
  method: "get",
  execute: async (_, req, res) => {
    const { id } = req.params;

    const investor = await investors.findOne(
      {
        "account.profile.id": id,
      },
      {
        "account.infomation": 0,
        _id: 0,
        __v: 0,
      }
    );

    if (!investor)
      return res.json({
        error: "No investor with this id found",
      });

    res.json(investor);
  },
} satisfies Route;
