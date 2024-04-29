import fs from "fs";
import { connect, connection } from "mongoose";
import DatabaseStatus from "../types/databaseStatus";
import investors from "./schemas/investors";
import markets from "./schemas/markets";
import defaultValues from "../config/defaultValues";

const startDatabase = async () => {
  for (const file of fs.readdirSync("src/database/statuses")) {
    const status: DatabaseStatus = (await import(`./statuses/${file}`)).default;
    connection.on(status.status, (...data) => status.execute(...data));
  }

  await connect(process.env.MONGODB_CONNECTION_STRING as string);

  let investorData = await investors.findOne();
  if (!investorData)
    investorData = await new investors(defaultValues.investors).save();

  let marketData = await markets.findOne();
  if (!marketData) marketData = await new markets(defaultValues.markets).save();

  return {
    investorData: investorData.toObject(),
    marketData: marketData.toObject(),
  };
};

export default startDatabase;
