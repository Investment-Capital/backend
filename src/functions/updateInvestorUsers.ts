import { Client } from "discord.js";
import Cache from "../types/cache";

const updateInvestorUsers = (cache: Cache, client: Client): void => {
  for (const investor of cache.investors) {
    const cachedUser = client.users.cache.get(investor.user.id);
    if (cachedUser)
      investor.user = {
        id: cachedUser.id,
        displayName: cachedUser.displayName,
        username: cachedUser.username,
        avatarURL: cachedUser.displayAvatarURL(),
      };
  }
};

export default updateInvestorUsers;
