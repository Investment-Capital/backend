import realEstateConfig from "../config/realEstateConfig";
import stocksConfig from "../config/stocksConfig";
import RealEstate from "../enum/realEstate";
import Stocks from "../enum/stocks";
import RealEstateConfig from "../types/config/realEstateConfig";
import StocksConfig from "../types/config/stocksConfig";

const getInvestmentConfig = (investment: Stocks | RealEstate) => {
  return investment in stocksConfig
    ? stocksConfig[investment as keyof StocksConfig]
    : realEstateConfig[investment as keyof RealEstateConfig];
};

export default getInvestmentConfig;
