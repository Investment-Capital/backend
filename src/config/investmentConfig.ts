import StockConfig from "../types/config/stockConfig";

class InvestmentConfig {
  static stocks: StockConfig = {
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
      income: 3,
      prestigeRequirement: 2,
      basePrice: 75,
      volatility: 7,
    },
    apl: {
      income: 6,
      prestigeRequirement: 2,
      basePrice: 100,
      volatility: 7,
    },
  };
}

export default InvestmentConfig;
