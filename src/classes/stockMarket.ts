import stockMarketHistory from "../database/schemas/stockMarketHistory";
import StockMarketHistory from "../types/stockMarketHistory";
import { config } from "dotenv";
config();

const MAX_HISTORY_LENGTH = parseInt(process.env.MAX_HISTORY_LENGTH as string);

class StockMarket {
  static price = async (id: string): Promise<number | undefined> => {
    const data = await stockMarketHistory
      .findOne({
        id,
      })
      .sort({
        date: -1,
      });

    return data?.price;
  };

  static prices = (): Promise<StockMarketHistory[]> =>
    stockMarketHistory.aggregate([
      { $sort: { id: 1, date: -1 } },
      {
        $group: {
          _id: "$id",
          id: { $first: "$id" },
          price: { $first: "$price" },
          date: { $first: "$date" },
        },
      },
      { $project: { date: 1, price: 1, id: 1, _id: 0 } },
    ]);

  static history = (
    id: string,
    time: number
  ): Promise<Omit<StockMarketHistory, "id">[]> =>
    stockMarketHistory.aggregate([
      { $match: { date: { $gte: Date.now() - time }, id } },
      { $sort: { date: 1 } },
      {
        $setWindowFields: {
          sortBy: { date: 1 },
          output: {
            idx: { $documentNumber: {} },
            total: { $count: {} },
          },
        },
      },
      {
        $addFields: {
          scaled: {
            $floor: {
              $divide: [{ $multiply: ["$idx", MAX_HISTORY_LENGTH] }, "$total"],
            },
          },
        },
      },
      {
        $group: {
          _id: "$scaled",
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $project: { date: 1, price: 1, _id: 0 } },
    ]);
}

export default StockMarket;
