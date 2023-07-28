import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import _ from "lodash";

import GaugeSeries from "../components/GaugeCharts/GaugeSeries";
import SolidGauge from "../components/GaugeCharts/SolidGauge";
import StackedBar from "../components/BarCharts/StackedBar";

const arrayEnergizer = [
  {
    name: "Neymar",
    shippable: 40,
  },
  {
    name: "Mbappe",
    shippable: 52,
  },
  {
    name: "Lewandowski",
    shippable: 70,
  },
  {
    name: "Messi",
    shippable: 80,
  },
  {
    name: "Cristiano",
    shippable: 140,
  },
];

const arrayAvance = [
  {
    percent: "100%",
    shippable: 137,
  },
  {
    percent: "76-99%",
    shippable: 8,
  },
  {
    percent: "51-75%",
    shippable: 80,
  },
  {
    percent: "31-50%",
    shippable: 0,
  },
  {
    percent: "1-30%",
    shippable: 0,
  },
  {
    percent: "0%",
    shippable: 500,
  },
];

const arrayLabelsEnergizer = _.map(arrayEnergizer, "name");
const seriesEnergizer = _.map(arrayEnergizer, "shippable");
const arrayLabelsAdvance = _.map(arrayAvance, "percent");
const seriesAdvance = _.map(arrayAvance, "shippable");

const Dashboard = () => {
  return (
    <>
      <div className="container mx-auto">
        {/* <div className="flex flex-col items-center mb-3">
          <h1 className="text-3xl font-bold">Plant Readiness</h1>
          <div className="w-2/3 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <h2 className="text-xl">
            ScoreCard &quot;Incremento a la capacidad BT Energía&quot;
          </h2>
        </div> */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-4">
            <Card>
              <CardContent>
                <h2 className="text-xl text-center">Total Entregables</h2>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent>
                <StackedBar
                  title="Entregables Energizador"
                  dataLabels={arrayLabelsEnergizer}
                  dataSeries={seriesEnergizer}
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <StackedBar
                  title="Avance Entregables"
                  dataLabels={arrayLabelsAdvance}
                  dataSeries={seriesAdvance}
                />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent>
                {/* <h2 className="text-xl text-center">Gauge</h2> */}
                <div className="grid grid-cols-2 gap-2">
                  <GaugeSeries height={200} title="Cump Total" />
                  <GaugeSeries height={200} title="Cump YTD" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="text-xl text-center">Cumplimiento Rubros</h2>
                <div className="grid grid-cols-3 gap-2 gap-y-0">
                  <SolidGauge value={100} name="Seguridad" height={120} />
                  <SolidGauge value={20} name="Calidad" height={120} />
                  <SolidGauge value={100} name="RH" height={120} />
                  <SolidGauge value={20} name="Producción" height={120} />
                  <SolidGauge value={20} name="Mantenimiento" height={120} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
