import Stocks from "../../enum/stocks";
import StocksConfigData from "./stockConfigData";

type StockConfig = {
  [_ in Stocks]: StocksConfigData;
};

export default StockConfig;
