import stockConfig from "../../../database/schemas/stockConfig";
import Route from "../../../types/route";

export default {
  path: "/stocks/config",
  method: "get",
  execute: async (__, _, res) => {
    const data = await stockConfig.find({}, { _id: 0, __v: 0 });

    if (data.length == 0)
      return res.status(404).json({
        error: "No stocks have been uploaded",
      });

    res.json(data);
  },
} satisfies Route;
