import Investor from "../../classes/investor";
import StockMarket from "../../classes/stockMarket";
import investors from "../../database/schemas/investors";
import stockConfigModel from "../../database/schemas/stockConfig";
import ScheduledJob from "../../types/scheduledJob";

export default {
  time: "0 * * * *",
  execute: async () => {
    const [stockPrices, stockConfig] = await Promise.all([
      StockMarket.prices(),
      stockConfigModel.find(),
    ]);

    const investorStream = investors.find().cursor();
    for await (const investor of investorStream) {
      const income = Investor.income(investor, stockPrices, stockConfig);
      await investors.updateOne(
        {
          "account.profile.id": investor.account.profile.id,
        },
        {
          $inc: {
            cash: income,
          },
        }
      );
    }
  },
} satisfies ScheduledJob;
