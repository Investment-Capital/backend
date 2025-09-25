import { model, Schema } from "mongoose";
import StockMarketHistory from "../../types/stockMarketHistory";

const stockMarketHistory = new Schema<StockMarketHistory>({
  date: Number,
  price: Number,
});

export default model("stockMarketHistory", stockMarketHistory);
