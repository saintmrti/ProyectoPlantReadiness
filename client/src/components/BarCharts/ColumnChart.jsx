import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ColumnChart = ({ series, height }) => {
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
        xAxis: {
          type: "datetime",
        },

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
      }}
    />
  );
};

export default ColumnChart;
