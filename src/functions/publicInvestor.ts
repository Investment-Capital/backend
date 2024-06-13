import Investor from "../types/investor";

const publicInvestor = (investor: Investor) => {
  const newInvestor: Partial<Investor> = { ...investor };
  delete newInvestor.authorization;
  delete newInvestor.blacklist;

  return newInvestor;
};

export default publicInvestor;
