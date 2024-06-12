import fs from "fs";
import { connect, connection } from "mongoose";
import DatabaseStatus from "../types/databaseStatus";
import investors from "./schemas/investors";
import markets from "./schemas/markets";
import DefaultValues from "../config/defaultValues";
import objectifyDocument from "../functions/objectifyDocument";

const startDatabase = async () => {
  for (const file of fs.readdirSync("src/database/statuses")) {
    const status: DatabaseStatus = (await import(`./statuses/${file}`)).default;
    connection.on(status.status, (...data) => status.execute(...data));
  }

  await connect(process.env.MONGODB_CONNECTION_STRING as string, {
    dbName: process.env.DATABASE_NAME,
  });

  const investorData = await investors.find();

  let marketData = await markets.findOne();
  if (!marketData) marketData = await new markets(DefaultValues.markets).save();

  return {
    investorData: investorData.map(objectifyDocument),
    marketData: objectifyDocument(marketData),
  };
};

export default startDatabase;
