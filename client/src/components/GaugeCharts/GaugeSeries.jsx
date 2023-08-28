import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGaugeUI from "highcharts/modules/solid-gauge";

HighchartsMore(Highcharts);
SolidGaugeUI(Highcharts);

const GaugeSeries = ({ height, title, total, value, rate }) => {
  const parts = total / 4;
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "gauge",
          backgroundColor: "transparent",
          height,
          style: {
            fontFamily: "montserrat",
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
            fontSize: "1rem",
            lineHeight: "1.5rem",
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
          max: total,
          tickPixelInterval: 72,
          // tickPositioner: function () {
          //   return [
          //     0,
          //     parseInt(parts),
          //     parseInt(parts * 2),
          //     parseInt(parts * 3),
          //     total,
          //   ];
          // },
          tickPosition: "inside",
          tickColor:
            Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
          tickLength: 20,
          tickWidth: 2,
          minorTickInterval: null,
          // endOnTick: true,
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
              to: parts,
              color: "#f44336", // red
              thickness: 20,
            },
            {
              from: parts,
              to: parts * 2,
              color: "#ffa726", // orange
              thickness: 20,
            },
            {
              from: parts * 2,
              to: parts * 3,
              color: "#DDDF0D", // yellow
              thickness: 20,
            },
            {
              from: parts * 3,
              to: total,
              color: "#66bb6a", // green
              thickness: 20,
            },
          ],
        },
        series: [
          {
            name: "entregables",
            data: [value],
            // tooltip: {
            //   valueSuffix: " %",
            // },
            dataLabels: {
              format: rate + "%",
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
