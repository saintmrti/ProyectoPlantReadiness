import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

Highcharts.setOptions({
  lang: {
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  },
});

const ColumnChart = ({ series, height, categories, cumplience, showYear }) => {
  const seriesLine = [
    {
      name: "Cumplimiento",
      type: "spline",
      data: cumplience,
      color: "#757575",
    },
  ];
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "column",
          height,
          style: {
            fontFamily: "Montserrat",
          },
          time: {
            timezone: "America/Mexico_City",
          },
          backgroundColor: "transparent",
        },
        title: null,
        xAxis: categories
          ? { categories }
          : {
              type: "datetime",
              labels: { format: showYear ? "{value:%Y}" : "{value:%B}" },
            },
        yAxis: {
          allowDecimals: false,
          min: 0,
          title: null,
          // title: {
          //   text: "Entregables",
          // },
        },
        accessibility: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },

        tooltip: {
          shared: true,
          xDateFormat: showYear ? "%Y" : "%d/%m/%Y",
        },

        plotOptions: {
          column: {
            stacking: null,
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: cumplience ? [...series, ...seriesLine] : series,
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
