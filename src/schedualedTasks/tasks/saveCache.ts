import times from "../../classes/times";
import investors from "../../database/schemas/investors";
import SchedualedTask from "../../types/schedualedTask";

export default {
  date: times.second,
  execute: async (cache) => {
    await investors.updateOne({
      investors: cache.investors,
    });
  },
} satisfies SchedualedTask;
