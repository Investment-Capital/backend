import Times from "../../classes/times";
import ScheduledTask from "../../types/scheduledTask";

export default {
  date: Times.minute * 5,
  execute: async (cache) => {
    for (const investor of cache.investors) {
      const cachedUser = cache.client.users.cache.get(investor.user.id);
      if (cachedUser)
        investor.user = {
          id: cachedUser.id,
          displayName: cachedUser.displayName,
          username: cachedUser.username,
          avatar: cachedUser.displayAvatarURL(),
        };
    }
  },
} satisfies ScheduledTask;
