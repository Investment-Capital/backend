import { User } from "discord.js";
import Cache from "../types/cache";

const createAccount = (cache: Cache, user: User) =>
  cache.investors.push({
    cash: 1000,
    prestige: 1,
    created: Date.now(),
    authorization: Math.random().toString(16).substring(2, 14),
    user: {
      id: user.id,
      displayName: user.displayName,
      username: user.username,
      avatar: user.displayAvatarURL(),
    },
    blacklist: {
      author: null,
      reason: null,
      date: null,
      blacklisted: false,
      history: [],
    },
  });

export default createAccount;
