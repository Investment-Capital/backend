import Times from "../classes/times";
import MarketGraphLengths from "../enum/marketGraphLengths";

const marketGraphLengths: { [_ in MarketGraphLengths]: number } = {
  ["1 Day"]: Times.day,
  ["3 Days"]: Times.day * 3,
  ["1 Week"]: Times.week,
};

export default marketGraphLengths;
