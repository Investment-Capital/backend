import { User } from "discord.js";
import Cache from "../types/cache";
import EmitterValues from "../classes/emitterValues";

const createAccount = (cache: Cache, user: User) => {
  const applicationOwner = cache.client.application?.owner;
  const ownerId = !applicationOwner
    ? null
    : "ownerId" in applicationOwner
    ? applicationOwner.ownerId
    : applicationOwner.id;

  const data = {
    cash: 1000,
    prestige: 1,
    created: Date.now(),
    authorization: Math.random().toString(16).substring(2, 16),
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
    permissions: {
      owner: ownerId == user.id,
      admin: false,
    },
  };

  cache.investors.push(data);
  cache.events.emit(EmitterValues.investorCreate, data);
  return data;
};

export default createAccount;
