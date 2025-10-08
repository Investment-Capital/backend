import StockConfig from "../types/stockConfig";

class Stocks {
  static ownershipLimit = (config: StockConfig) => config.defaultOwnershipLimit; // will add upgrades etc eventually

  static taxPercentage = (currentOwnership: number, config: StockConfig) =>
    Math.min(
      (Stocks.ownershipLimit(config) / currentOwnership) *
        config.maxTaxPercentage,
      config.maxTaxPercentage
    );
  static salesTaxPercentage = (
    currentOwnership: number,
    salesAmount: number,
    config: StockConfig
  ) => Stocks.taxPercentage((2 * currentOwnership - salesAmount) / 2, config);
}

export default Stocks;
