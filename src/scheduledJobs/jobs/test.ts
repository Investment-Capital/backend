import stockMarketHistory from "../../database/schemas/stockMarketHistory";
import ScheduledJob from "../../types/scheduledJob";

export default {
  time: "*/1 * * * * *",
  execute: () =>
    new stockMarketHistory({
      stock: "SOAP",
      price: Math.random() * 100,
      date: Date.now(),
    }).save(), // test
} satisfies ScheduledJob;
