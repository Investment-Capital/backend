import { model } from "mongoose";
import Logger from "../classes/logger";
import defaultInvestorData from "../config/defaultInvestorData";
import investors from "../database/schemas/investors";
import Investor from "../types/investor";
import modifyUndefinedValues from "./modifyUndefinedValues";
import objectifyDocument from "./objectifyDocument";

const fetchInvestors = async (): Promise<Investor[]> => {
  const data = await investors.find();
  const modifiedData: Investor[] = [];
  const investorsData: Investor[] = data.map(objectifyDocument);

  for (const investor of investorsData) {
    const defaultInvestor = defaultInvestorData(
      investor.user,
      investor.role,
      investor.authorization
    );

    modifyUndefinedValues(investor, defaultInvestor) &&
      modifiedData.push(investor);
  }

  const bulk = modifiedData.map((investor) => ({
    updateOne: {
      filter: { "user.id": investor.user.id },
      update: {
        $set: investor,
      },
      upsert: true,
    },
  }));

  if (bulk.length > 0) {
    Logger.info(`Updating ${bulk.length} investors with undefined values`);
    await model("investors").bulkWrite(bulk);
    Logger.success(`Updated investors with undefined values`);
  }

  return investorsData;
};

export default fetchInvestors;
