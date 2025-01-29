import Times from "../classes/times";
import MarketGraphTimes from "../enum/marketGraphTimes";

const marketGraphTimes: { [_ in MarketGraphTimes]: number } = {
  ["1 Day"]: Times.day,
  ["3 Days"]: Times.day * 3,
  ["1 Week"]: Times.week,
};

export default marketGraphTimes;
