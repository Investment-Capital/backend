import { Schema, model } from "mongoose";
import StockMarket from "../../types/markets/stockMarket";
import Investment from "../../types/markets/investment";
import History from "../../types/markets/history";
import Markets from "../../types/markets/markets";

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
  {
    sop: investment,
    rbx: investment,
    apl: investment,
  },
  {
    _id: false,
  }
);

const markets = new Schema<Markets>({
  stocks: stockMarket,
});

export default model("markets", markets, "markets");
