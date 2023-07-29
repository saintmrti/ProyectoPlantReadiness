import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const StackedBar = ({ title, categories, series }) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "bar",
        },
        title: {
          text: title,
          style: {
            fontWeight: "normal",
            fontSize: ".9rem",
            lineHeight: "1.75rem",
          },
        },
        xAxis: {
          categories,
        },
        yAxis: {
          min: 0,
          title: {
            text: "Entregables",
          },
          gridLineWidth: 0,
        },
        legend: {
          enabled: false,
          padding: 0,
          backgroundColor: "transparent",
        },
        accessibility: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          series: {
            stacking: "normal",
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: "Entregables",
            data: series,
          },
          //   {
          //     name: "Lionel Messi",
          //     data: [5, 3, 12, 6, 11],
          //   },
          //   {
          //     name: "Robert Lewandowski",
          //     data: [5, 15, 8, 5, 8],
          //   },
        ],
      }}
    />
  );
};

export default StackedBar;
