type StockConfig = {
  name: string;
  icon: string;
  priceChangeRange: number;
  prestigeRequirement: number;
  maxSaleTaxPercentage: number;

  defaultPrice: number;
  defaultOwnershipLimit: number;
};

export default StockConfig;
