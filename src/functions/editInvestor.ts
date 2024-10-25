import EmitterValues from "../classes/emitterValues";
import Cache from "../types/cache";
import Investor from "../types/investor";

const editInvestor = (
  cache: Cache,
  investor: Investor,
  update: (investor: Investor) => any
) => {
  update(investor);
  cache.events.emit(EmitterValues.investorUpdate, investor);

  if (!cache.unsavedCache.investors.includes(investor.user.id))
    cache.unsavedCache.investors.push(investor.user.id);

  return investor;
};

export default editInvestor;
