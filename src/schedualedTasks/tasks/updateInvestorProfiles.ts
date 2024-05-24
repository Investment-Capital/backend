import times from "../../classes/times";
import SchedualedTask from "../../types/schedualedTask";

export default {
  date: times.minute * 5,
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
} satisfies SchedualedTask;
