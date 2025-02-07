import { Schema, model } from "mongoose";
import Investment from "../../types/markets/investment";
import History from "../../types/markets/history";
import MarketsType from "../../types/markets/markets";
import Markets from "../../enum/markets";

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

const markets = new Schema<MarketsType>(
  Object.values(Markets).reduce((object: any, marketName) => {
    object[marketName] = {
      type: Object,
      of: investment,
    };

    return object;
  }, {})
);

export default model("markets", markets, "markets");
