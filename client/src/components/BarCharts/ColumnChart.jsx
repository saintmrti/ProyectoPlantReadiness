import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ColumnChart = ({ series, height, categories }) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "column",
          height,
          style: {
            fontFamily: "Roboto",
          },
          time: {
            timezone: "America/Mexico_City",
          },
        },
        title: null,
        xAxis: categories ? { categories } : { type: "datetime" },

        yAxis: {
          allowDecimals: false,
          min: 0,
          title: null,
          // title: {
          //   text: "Entregables",
          // },
        },
        // legend: {
        //   enabled: false,
        //   padding: 0,
        //   backgroundColor: "transparent",
        // },
        accessibility: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },

        tooltip: {
          shared: true,
          xDateFormat: "%d/%m/%Y",
        },

        plotOptions: {
          column: {
            stacking: null,
            dataLabels: {
              enabled: true,
            },
          },
        },
        series,
        colors: [
          "#303F9F",
          "#f44336",
          "#64B5F6",
          "#2E7D32",
          "#43A047",
          "#8BC34A",
          "#CDDC39",
          "#FFEB3B",
          "#FFA000",
          "#EF6C00",
          "#E64A19",
          "#F48FB1",
          "#D81B60",
          "#BA68C8",
          "#7B1FA2",
        ],
      }}
    />
  );
};

export default ColumnChart;
