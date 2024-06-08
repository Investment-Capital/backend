import fs from "fs";
import { connect, connection } from "mongoose";
import DatabaseStatus from "../types/databaseStatus";
import investors from "./schemas/investors";
import markets from "./schemas/markets";
import DefaultValues from "../config/defaultValues";

const startDatabase = async () => {
  for (const file of fs.readdirSync("src/database/statuses")) {
    const status: DatabaseStatus = (await import(`./statuses/${file}`)).default;
    connection.on(status.status, (...data) => status.execute(...data));
  }

  await connect(process.env.MONGODB_CONNECTION_STRING as string);

  const investorData = await investors.find();

  let marketData = await markets.findOne();
  if (!marketData) marketData = await new markets(DefaultValues.markets).save();

  return {
    investorData: investorData.map((investor) => {
      const newData: any = { ...investor.toObject() };
      delete newData._id;
      return newData;
    }),
    marketData: marketData.toObject(),
  };
};

export default startDatabase;
