import fs from "fs";
import { connect, connection } from "mongoose";
import investors from "./schemas/investors";
import markets from "./schemas/markets";
import DefaultValues from "../config/defaultValues";
import objectifyDocument from "../functions/objectifyDocument";
import Event from "../types/event";

const startDatabase = async () => {
  for (const file of fs.readdirSync("src/database/events")) {
    const event: Event = (await import(`./events/${file}`)).default;
    (connection as any).on(event.event, (...data: any[]) =>
      event.execute(...data)
    );
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
