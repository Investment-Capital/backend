import fs from "fs";
import { connect, connection } from "mongoose";
import markets from "./schemas/markets";
import Event from "../types/event";
import defaultMarketData from "../defaults/defaultMarketData";
import fetchInvestors from "../functions/fetchInvestors";
import fetchMarkets from "../functions/fetchMarkets";
import path from "path";

const startDatabase = async () => {
  for (const file of fs.readdirSync(path.join(__dirname, "./events"))) {
    const event: Event = (await import(`./events/${file}`)).default;
    (connection as any).on(event.event, (...data: any[]) =>
      event.execute(...data)
    );
  }

  await connect(process.env.MONGODB_CONNECTION_STRING as string, {
    dbName: process.env.DATABASE_NAME,
  });

  let [investorData, marketData] = await Promise.all([
    fetchInvestors(),
    fetchMarkets(),
  ]);
  if (!marketData) marketData = await new markets(defaultMarketData).save();

  return {
    investorData,
    marketData,
  };
};

export default startDatabase;
