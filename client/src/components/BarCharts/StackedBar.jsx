import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const StackedBar = ({ height, categories, series }) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "bar",
          height,
          style: {
            fontFamily: "Roboto",
          },
        },
        title: null,
        xAxis: {
          categories,
        },
        yAxis: {
          min: 0,
          title: null,
          // title: {
          //   text: "Entregables",
          // },
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
        colors: ["#303F9F", "#FFA000", "#EF6C00", "#E64A19"],
      }}
    />
  );
};

export default StackedBar;
