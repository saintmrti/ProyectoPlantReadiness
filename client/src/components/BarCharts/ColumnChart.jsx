import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ColumnChart = ({ title, series }) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "column",
          height: 200,
          style: {
            fontFamily: "Roboto",
          },
          time: {
            timezone: "America/Mexico_City",
          },
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
          type: "datetime",
        },

        yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
            text: "Count medals",
          },
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
