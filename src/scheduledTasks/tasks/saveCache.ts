import times from "../../classes/times";
import investors from "../../database/schemas/investors";
import ScheduledTask from "../../types/scheduledTask";

export default {
  date: times.second,
  execute: async (cache) => {
    await investors.updateOne({
      investors: cache.investors,
    });
  },
} satisfies ScheduledTask;
