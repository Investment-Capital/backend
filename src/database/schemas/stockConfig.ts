import { model, Schema } from "mongoose";
import StockConfig from "../../types/stockConfig";

const stockConfig = new Schema<StockConfig>({
  name: String,
  icon: String,
  priceChangeRange: Number,
  prestigeRequirement: Number,
  maxTaxPercentage: Number,
  dividendPercentage: Number,
  defaultOwnershipLimit: Number,
  id: String,
  levelRequirement: Number,
});

export default model("stockConfig", stockConfig);
