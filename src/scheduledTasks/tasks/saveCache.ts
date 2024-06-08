import { isEqual } from "lodash";
import EmitterValues from "../../classes/emitterValues";
import Times from "../../classes/times";
import investors from "../../database/schemas/investors";
import ScheduledTask from "../../types/scheduledTask";

export default {
  date: Times.second * 5,
  execute: async (cache) => {
    const beforeInvestors = (await investors.find()).map((investor) => {
      const newData: any = { ...investor.toObject() };
      delete newData._id;
      return newData;
    });

    const bulk = [];
    for (const investor of cache.investors) {
      bulk.length % 25 == 0 &&
        (await new Promise((resolve) => setTimeout(resolve, 0)));

      const foundBefore = beforeInvestors.find(
        (beforeInvestor) => beforeInvestor.user.id == investor.user.id
      );

      if (!foundBefore || !isEqual(investor, foundBefore)) {
        bulk.push({
          updateOne: {
            filter: { "user.id": investor.user.id },
            update: { $set: investor },
            upsert: true,
          },
        });
      }
    }

    bulk.length > 0 && (await investors.bulkWrite(bulk));
    cache.events.emit(EmitterValues.cached);
  },
} satisfies ScheduledTask;
