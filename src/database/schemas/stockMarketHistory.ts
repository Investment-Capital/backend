import { model, Schema } from "mongoose";
import StockMarketHistory from "../../types/stockMarketHistory";

const stockMarketHistory = new Schema<StockMarketHistory>({
  date: Number,
  price: Number,
  id: String,
});

stockMarketHistory.index({ id: 1, date: -1 });
stockMarketHistory.index({ id: 1, date: 1 });

export default model("stockMarketHistory", stockMarketHistory);
