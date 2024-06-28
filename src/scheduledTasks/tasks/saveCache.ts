import EmitterValues from "../../classes/emitterValues";
import Times from "../../classes/times";
import investors from "../../database/schemas/investors";
import Cache from "../../types/cache";
import ScheduledTask from "../../types/scheduledTask";
import { isEqual } from "lodash";

export default {
  date: Times.second * 5,
  execute: async (cache: Cache) => {
    const beforeInvestors = (await investors.find()).map((investor) => {
      const newData: any = { ...investor.toObject() };
      delete newData._id;
      return newData;
    });

    const bulk = [];
    let index = 0;
    for (const investor of cache.investors) {
      index++;
      const foundBefore = beforeInvestors.find(
        (beforeInvestor) => beforeInvestor.user.id == investor.user.id
      );
      index % 10 == 0 &&
        (await new Promise((resolve) => setTimeout(resolve, 0)));

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

    if (bulk.length > 0) await investors.bulkWrite(bulk);
    cache.events.emit(EmitterValues.cached);
  },
} satisfies ScheduledTask;
