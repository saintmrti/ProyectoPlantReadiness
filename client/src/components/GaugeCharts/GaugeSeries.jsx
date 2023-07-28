import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGaugeUI from "highcharts/modules/solid-gauge";

HighchartsMore(Highcharts);
SolidGaugeUI(Highcharts);

const GaugeSeries = ({ height, title }) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "gauge",
          backgroundColor: "transparent",
          height,
          style: {
            fontFamily: "Roboto",
          },
        },
        plotOptions: {
          series: {
            marker: { enabled: false },
          },
        },
        title: {
          text: title,
          style: {
            fontWeight: "normal",
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
          },
        },
        pane: {
          startAngle: -90,
          endAngle: 89.9,
          background: null,
          center: ["50%", "75%"],
          size: "110%",
        },
        yAxis: {
          min: 0,
          max: 200,
          tickPixelInterval: 72,
          tickPosition: "inside",
          tickColor:
            Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
          tickLength: 20,
          tickWidth: 2,
          minorTickInterval: null,
          labels: {
            distance: 20,
            style: {
              fontSize: "14px",
            },
          },
          lineWidth: 0,
          plotBands: [
            {
              from: 0,
              to: 120,
              color: "#55BF3B", // green
              thickness: 20,
            },
            {
              from: 120,
              to: 160,
              color: "#DDDF0D", // yellow
              thickness: 20,
            },
            {
              from: 160,
              to: 200,
              color: "#DF5353", // red
              thickness: 20,
            },
          ],
        },
        series: [
          {
            name: "Cumplimiento",
            data: [80],
            tooltip: {
              valueSuffix: " %",
            },
            dataLabels: {
              format: "{y} %",
              borderWidth: 0,
              color:
                (Highcharts.defaultOptions.title &&
                  Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                "#333333",
              style: {
                fontSize: "16px",
              },
            },
            dial: {
              radius: "80%",
              backgroundColor: "gray",
              baseWidth: 12,
              baseLength: "0%",
              rearLength: "0%",
            },
            pivot: {
              backgroundColor: "gray",
              radius: 6,
            },
          },
        ],
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
      }}
    />
  );
};

export default GaugeSeries;
