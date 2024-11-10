import Cache from "../types/cache";
import EmitterValues from "../classes/emitterValues";
import SavedUser from "../types/savedUser";
import defaultInvestorData from "../config/defaultInvestorData";
import generateAuthorization from "./generateAuthorization";

const createAccount = (cache: Cache, user: SavedUser) => {
  const applicationOwner = cache.client.application?.owner;
  const ownerId = !applicationOwner
    ? null
    : "ownerId" in applicationOwner
    ? applicationOwner.ownerId
    : applicationOwner.id;

  const data = defaultInvestorData(
    user,
    {
      owner: ownerId == user.id,
      admin: false,
    },
    generateAuthorization()
  );

  cache.investors.push(data);
  cache.unsavedCache.investors.push(data.user.id);
  cache.events.emit(EmitterValues.investorCreate, data);

  return data;
};

export default createAccount;
