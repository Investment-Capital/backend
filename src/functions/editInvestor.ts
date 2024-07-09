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
  if (!cache.unsavedInvestors.includes(investor.user.id))
    cache.unsavedInvestors.push(investor.user.id);

  return investor;
};

export default editInvestor;
