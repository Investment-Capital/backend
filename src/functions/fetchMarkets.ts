import { model } from "mongoose";
import Logger from "../classes/logger";
import markets from "../database/schemas/markets";
import Markets from "../types/markets/markets";
import modifyUndefinedValues from "./modifyUndefinedValues";
import objectifyDocument from "./objectifyDocument";
import defaultMarketData from "../config/defaultMarketData";

const fetchMarkets = async (): Promise<Markets | null> => {
  const data = await markets.findOne();
  if (!data) return null;

  const marketData: Markets = objectifyDocument(data);

  if (modifyUndefinedValues(marketData, defaultMarketData)) {
    Logger.info("Updating undefined market values");
    await model("markets").updateOne({}, marketData);
    Logger.success("Updated undefined market values");
  }

  return marketData;
};

export default fetchMarkets;
