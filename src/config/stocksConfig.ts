import StocksConfig from "../types/config/stocksConfig";

const stocksConfig: StocksConfig = {
  sop: {
    income: 0,
    prestigeRequirement: 1,
    basePrice: 25,
    volatility: 7.5,
  },
  abc: {
    income: 1,
    prestigeRequirement: 1,
    basePrice: 50,
    volatility: 7.25,
  },
  rbx: {
    income: 2,
    prestigeRequirement: 1,
    basePrice: 75,
    volatility: 7,
  },
  apl: {
    income: 4,
    prestigeRequirement: 2,
    basePrice: 100,
    volatility: 7,
  },
  nvda: {
    income: 6,
    prestigeRequirement: 4,
    basePrice: 65,
    volatility: 8,
  },
};

export default stocksConfig;
