import Cache from "../types/cache";
import EmitterValues from "../classes/emitterValues";
import SavedUser from "../types/savedUser";
import defaultInvestorData from "../config/defaultInvestorData";
import generateCode from "./generateCode";
import Roles from "../enum/roles";

const createAccount = (cache: Cache, user: SavedUser) => {
  const applicationOwner = cache.client.application?.owner;
  const ownerId = !applicationOwner
    ? null
    : "ownerId" in applicationOwner
    ? applicationOwner.ownerId
    : applicationOwner.id;

  const data = defaultInvestorData(
    user,
    ownerId == user.id ? Roles.owner : Roles.player,
    generateCode()
  );

  cache.investors.push(data);
  cache.unsavedCache.investors.push(data.user.id);
  cache.events.emit(EmitterValues.investorCreate, data);

  return data;
};

export default createAccount;
