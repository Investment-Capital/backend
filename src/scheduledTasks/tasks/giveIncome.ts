import TimeManager from "../../classes/timeManager";
import editInvestor from "../../functions/editInvestor";
import getInvestorIncome from "../../functions/getInvestorIncome";
import Cache from "../../types/cache";
import ScheduledTask from "../../types/scheduledTask";

export default {
  time: TimeManager.hourly,
  execute: async (cache: Cache) => {
    for (const investor of cache.investors) {
      editInvestor(
        cache,
        investor,
        () => (investor.cash += getInvestorIncome(investor))
      );
    }
  },
} satisfies ScheduledTask;
