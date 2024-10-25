import Cache from "../types/cache";
import EmitterValues from "../classes/emitterValues";
import Investor from "../types/investor";
import generateAuthorization from "./generateAuthorization";
import SavedUser from "../types/savedUser";

const createAccount = (cache: Cache, user: SavedUser) => {
  const applicationOwner = cache.client.application?.owner;
  const ownerId = !applicationOwner
    ? null
    : "ownerId" in applicationOwner
    ? applicationOwner.ownerId
    : applicationOwner.id;

  const data: Investor = {
    cash: 1000,
    prestige: 1,
    created: Date.now(),
    authorization: generateAuthorization(),
    user,
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
  cache.unsavedCache.investors.push(data.user.id);
  cache.events.emit(EmitterValues.investorCreate, data);

  return data;
};

export default createAccount;
