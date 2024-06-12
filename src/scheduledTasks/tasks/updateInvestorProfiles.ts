import { isEqual } from "lodash";
import Times from "../../classes/times";
import ScheduledTask from "../../types/scheduledTask";
import editInvestor from "../../functions/editInvestor";

export default {
  date: Times.minute * 5,
  execute: async (cache) => {
    for (const investor of cache.investors) {
      const cachedUser = cache.client.users.cache.get(investor.user.id);

      if (cachedUser) {
        const newData = {
          id: cachedUser.id,
          displayName: cachedUser.displayName,
          username: cachedUser.username,
          avatar: cachedUser.displayAvatarURL(),
        };

        !isEqual(newData, investor.user) &&
          editInvestor(
            cache,
            investor,
            (investor) => (investor.user = newData)
          );
      }
    }
  },
} satisfies ScheduledTask;
