import Stocks from "../../enum/stocks";
import Investment from "./investment";

type StockMarket = {
  [_ in Stocks]: Investment;
};

export default StockMarket;
