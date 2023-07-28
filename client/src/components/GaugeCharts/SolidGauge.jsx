import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGaugeUI from "highcharts/modules/solid-gauge";

HighchartsMore(Highcharts);
SolidGaugeUI(Highcharts);

const SolidGauge = ({ value, name, height }) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "solidgauge",
          height,
          backgroundColor: "transparent",
          style: {
            fontFamily: "Roboto",
          },
        },

        title: null,
        pane: {
          center: ["50%", "85%"],
          size: "130%",
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
            innerRadius: "60%",
            outerRadius: "100%",
            shape: "arc",
          },
        },
        exporting: {
          enabled: false,
        },

        tooltip: {
          enabled: false,
        },
        yAxis: {
          stops: [
            [0.1, "#55BF3B"], // green
            [0.5, "#DDDF0D"], // yellow
            [0.9, "#DF5353"], // red
          ],
          lineWidth: 0,
          tickWidth: 0,
          minorTickInterval: null,
          tickAmount: 2,
          title: {
            y: -40,
            text: name,
          },
          labels: {
            y: 16,
          },
          min: 0,
          max: 200,
        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true,
            },
          },
        },
        credits: {
          enabled: false,
        },
        accessibility: {
          enabled: false,
        },
        series: [
          {
            name: "Rubro",
            data: [value],
            dataLabels: {
              format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">%</span>' +
                "</div>",
            },
            tooltip: {
              valueSuffix: " %",
            },
          },
        ],
      }}
    />
  );
};

export default SolidGauge;
