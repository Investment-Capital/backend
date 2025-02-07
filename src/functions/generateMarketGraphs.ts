import QuickChart from "quickchart-js";
import MarketsType from "../types/markets/markets";
import marketGraphTimes from "../config/marketGraphTimes";
import Cache from "../types/cache";
import capitalizeWords from "./capitalizeWords";
import Markets from "../enum/markets";

const generateMarketGraphs = async (marketData: MarketsType[Markets]) => {
  return (await Promise.all(
    Object.entries(marketGraphTimes).map(async ([timeName, timeValue]) => {
      const datasets = Object.entries(marketData).map(([name, data]) => {
        const filteredData = data.history.filter(
          (historyData) => historyData.date > Date.now() - timeValue
        );

        return {
          label: capitalizeWords(name),
          fill: false,
          data: filteredData.map((history) => ({
            x: new Date(history.date).toISOString(),
            y: history.value,
          })),
        };
      });

      const chart = new QuickChart().setBackgroundColor("black").setConfig({
        type: "line",
        data: {
          datasets,
        },
        options: {
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  parser: "YYYY-MM-DDTHH:mm:ss.SSSZ",
                  unit: "hour",
                  displayFormats: {
                    hour: "Do hA",
                  },
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          plugins: {
            tickFormat: {
              prefix: "$",
              notation: "compact",
            },
          },
        },
      });
      return { [timeName]: await chart.getShortUrl() };
    })
  ).then((entries) =>
    Object.assign({}, ...entries)
  )) as Cache["marketGraphs"][keyof Cache["marketGraphs"]];
};

export default generateMarketGraphs;
