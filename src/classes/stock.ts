import StockConfig from "../types/stockConfig";

class Stock {
  static ownershipLimit = (config: StockConfig) => config.defaultOwnershipLimit; // will add upgrades etc eventually
  static taxPercentage = (ownership: number, config: StockConfig) =>
    Math.min(
      (ownership / Stock.ownershipLimit(config)) * config.maxTaxPercentage,
      config.maxTaxPercentage
    );

  static calculateDividend = (
    price: number,
    owned: number,
    config: StockConfig
  ) =>
    ((price * owned * config.dividendPercentage) / 100) *
    (1 - Stock.taxPercentage(owned, config) / 100);

  static salesPrice = (
    stockPrice: number,
    amountSold: number,
    owned: number,
    config: StockConfig
  ) =>
    stockPrice *
    amountSold *
    (1 - Stock.taxPercentage(owned - amountSold * 0.5, config) / 100);
}

export default Stock;
