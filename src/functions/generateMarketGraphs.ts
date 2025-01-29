import QuickChart from "quickchart-js";
import Markets from "../types/markets/markets";
import marketGraphTimes from "../config/marketGraphTimes";
import Cache from "../types/cache";

const generateMarketGraphs = async (marketData: Markets[keyof Markets]) => {
  return (await Promise.all(
    Object.entries(marketGraphTimes).map(async ([timeName, timeValue]) => {
      const chart = new QuickChart().setConfig({
        type: "line",
        data: {
          labels: [],
          datasets: Object.entries(marketData).map(([name, data]) => ({
            label: name,
            data: data.history
              .filter(
                (historyData) => historyData.date > Date.now() - timeValue
              )
              .map((history) => history.value),
            fill: false,
          })),
        },
      });

      return { [timeName]: await chart.getShortUrl() };
    })
  ).then((entries) =>
    Object.assign({}, ...entries)
  )) as Cache["marketGraphs"][keyof Cache["marketGraphs"]];
};

export default generateMarketGraphs;
