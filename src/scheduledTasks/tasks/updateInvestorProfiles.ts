import { isEqual } from "lodash";
import Times from "../../classes/times";
import ScheduledTask from "../../types/scheduledTask";
import editInvestor from "../../functions/editInvestor";
import Cache from "../../types/cache";

export default {
  time: Times.minute * 5,
  execute: async (cache: Cache) => {
    for (const investor of cache.investors) {
      const cachedUser = cache.client.users.cache.get(investor.user.id);

      if (cachedUser) {
        const newData = {
          id: cachedUser.id,
          displayName: cachedUser.displayName,
          username: cachedUser.username,
          avatar: cachedUser.displayAvatarURL(),
        };

        if (!isEqual(newData, investor.user)) {
          editInvestor(
            cache,
            investor,
            (investor) => (investor.user = newData)
          );
        }
      }
    }
  },
} satisfies ScheduledTask;
