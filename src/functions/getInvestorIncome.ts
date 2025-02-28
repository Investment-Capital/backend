import realEstateConfig from "../config/realEstateConfig";
import stocksConfig from "../config/stocksConfig";
import Stocks from "../enum/stocks";
import Upgrades from "../enum/upgrades";
import Investor from "../types/investor";
import getInvestorUpgradeAmount from "./getInvestorUpgradeAmount";

const getInvestorIncome = (investor: Investor) => {
  let income = 0;

  for (const stock of Object.values(Stocks)) {
    const config = stocksConfig[stock];
    income += investor.stocks[stock] * config.income;
  }

  for (const realEstate of investor.realEstate.filter(
    (realEstate) => realEstate.built
  )) {
    const config = realEstateConfig[realEstate.type];
    income += config.rent;
  }

  return (
    income * (getInvestorUpgradeAmount(investor, Upgrades.incomeIncrease) / 100)
  );
};

export default getInvestorIncome;
