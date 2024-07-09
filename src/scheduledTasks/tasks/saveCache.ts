import EmitterValues from "../../classes/emitterValues";
import Times from "../../classes/times";
import investors from "../../database/schemas/investors";
import Cache from "../../types/cache";
import ScheduledTask from "../../types/scheduledTask";

export default {
  date: Times.second * 5,
  execute: async (cache: Cache) => {
    const updatingInvestors = [...cache.unsavedInvestors];
    cache.unsavedInvestors = [];

    const bulk = updatingInvestors.map((investor) => ({
      updateOne: {
        filter: { "user.id": investor },
        update: {
          $set: cache.investors.find(
            (investorData) => investorData.user.id == investor
          ),
        },
        upsert: true,
      },
    }));

    if (bulk.length > 0) await investors.bulkWrite(bulk);
    cache.events.emit(EmitterValues.cached);
  },
} satisfies ScheduledTask;
