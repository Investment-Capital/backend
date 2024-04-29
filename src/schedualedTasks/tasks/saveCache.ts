import investors from "../../database/schemas/investors";
import SchedualedTask from "../../types/schedualedTask";

export default {
  nextDate: 1000,
  interval: 1000,
  execute: async (cache) => {
    await investors.updateOne({
      investors: cache.investors,
    });
  },
} satisfies SchedualedTask;
