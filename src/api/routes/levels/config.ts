import levelConfig from "../../../database/schemas/levelConfig";
import Route from "../../../types/route";

export default {
  path: "/levels/config",
  method: "get",
  execute: async (__, _, res) => {
    const data = await levelConfig.find({}, { _id: 0, __v: 0 });

    if (data.length == 0)
      return res.status(404).json({
        error: "No levels have been uploaded",
      });

    res.json(data);
  },
} satisfies Route;
