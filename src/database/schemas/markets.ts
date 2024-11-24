import { Schema, model } from "mongoose";
import StockMarket from "../../types/markets/stockMarket";
import Investment from "../../types/markets/investment";
import History from "../../types/markets/history";
import Markets from "../../types/markets/markets";
import Stocks from "../../enum/stocks";
import defaultMarketData from "../../config/defaultMarketData";
import modifyUndefinedValues from "../../functions/modifyUndefinedValues";

const history = new Schema<History>(
  {
    date: Number,
    value: Number,
  },
  {
    _id: false,
  }
);

const investment = new Schema<Investment>(
  {
    price: Number,
    history: [history],
  },
  {
    _id: false,
  }
);

const stockMarket = new Schema<StockMarket>(
  Object.values(Stocks).reduce((object: any, stock) => {
    object[stock] = investment;
    return object;
  }, {}),
  {
    _id: false,
  }
);

const markets = new Schema<Markets>({
  stocks: stockMarket,
});

markets.post("findOne", async (marketData: Markets) => {
  modifyUndefinedValues(marketData, defaultMarketData) &&
    (await model("markets").updateOne({}, marketData));
});

export default model("markets", markets, "markets");
