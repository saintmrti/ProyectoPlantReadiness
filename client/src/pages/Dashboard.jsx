import Card from "@mui/material/Card";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import securityIcon from "../img/securityIcon.png";
import rhIcon from "../img/rhIcon.png";
import calidadIcon from "../img/calidadIcon.png";
import produccionIcon from "../img/produccionIcon.png";
import matenimientoIcon from "../img/mantenimientoIcon.png";
import GaugeSeries from "../components/GaugeCharts/GaugeSeries";
import SolidGauge from "../components/GaugeCharts/SolidGauge";
import StackedBar from "../components/BarCharts/StackedBar";
import ColumnChart from "../components/BarCharts/ColumnChart";
import { fetchExpectancyRequest } from "../slices/expectancy";
import { fetchShippableRequest } from "../slices/shippable";
import { fetchAdvanceRequest } from "../slices/advance";
import { getShippableByMonth } from "../selectors/kpis";
import { useEffect } from "react";

const dataEnergizer = {
  categories: [
    "JLMO",
    "ABG",
    "ACAB",
    "Fatima Elizondo",
    "O. Argueta",
    "C. Sánchez",
    "M. Nuñez",
    "A. Gaspar",
    "C. Chapa",
    "Claudia Chapa",
    "JACH",
    "MNN",
    "Carlos Camacho",
    "JCM",
    "OA",
    "R. Gonzales",
    "A. Montero",
    "C. Camacho",
    "A. Anguiano",
    "J. Marroquin",
  ],
  series: [
    6, 6, 7, 7, 8, 12, 12, 12, 13, 13, 14, 16, 16, 36, 47, 52, 70, 76, 88, 140,
  ],
};

const dataAdvance = {
  categories: ["100%", "76-99%", "51-75%", "31-50%", "1-30%", "0%"],
  series: [137, 63, 80, 48, 79, 500],
};

const seriesPerYear = [
  {
    name: "Plan",
    data: [
      [moment(`2021-01-01`, "YYYY-MM-DD").valueOf(), 240],
      [moment(`2022-01-01`, "YYYY-MM-DD").valueOf(), 305],
      [moment(`2023-01-01`, "YYYY-MM-DD").valueOf(), 438],
      [moment(`2024-01-01`, "YYYY-MM-DD").valueOf(), 239],
      [moment(`2025-01-01`, "YYYY-MM-DD").valueOf(), 150],
    ],
  },
  {
    name: "Real",
    data: [
      [moment(`2021-01-01`, "YYYY-MM-DD").valueOf(), 140],
      [moment(`2022-01-01`, "YYYY-MM-DD").valueOf(), 290],
      [moment(`2023-01-01`, "YYYY-MM-DD").valueOf(), 115],
      [moment(`2024-01-01`, "YYYY-MM-DD").valueOf(), 206],
      [moment(`2025-01-01`, "YYYY-MM-DD").valueOf(), 200],
    ],
  },
];

// const seriesPerMonth = [
//   {
//     name: "Plan",
//     data: [
//       [moment(`2023-01-01`, "YYYY-MM-DD").valueOf(), 20],
//       [moment(`2023-02-01`, "YYYY-MM-DD").valueOf(), 40],
//       [moment(`2023-03-01`, "YYYY-MM-DD").valueOf(), 50],
//       [moment(`2023-04-01`, "YYYY-MM-DD").valueOf(), 30],
//       [moment(`2023-05-01`, "YYYY-MM-DD").valueOf(), 20],
//       [moment(`2023-06-01`, "YYYY-MM-DD").valueOf(), 28],
//       [moment(`2023-07-01`, "YYYY-MM-DD").valueOf(), 42],
//       [moment(`2023-08-01`, "YYYY-MM-DD").valueOf(), 10],
//       [moment(`2023-09-01`, "YYYY-MM-DD").valueOf(), 79],
//       [moment(`2023-10-01`, "YYYY-MM-DD").valueOf(), 62],
//       [moment(`2023-11-01`, "YYYY-MM-DD").valueOf(), 20],
//       [moment(`2023-12-01`, "YYYY-MM-DD").valueOf(), 24],
//     ],
//   },
//   {
//     name: "Real",
//     data: [
//       [moment(`2023-01-01`, "YYYY-MM-DD").valueOf(), 10],
//       [moment(`2023-02-01`, "YYYY-MM-DD").valueOf(), 36],
//       [moment(`2023-03-01`, "YYYY-MM-DD").valueOf(), 48],
//       [moment(`2023-04-01`, "YYYY-MM-DD").valueOf(), 25],
//       [moment(`2023-05-01`, "YYYY-MM-DD").valueOf(), 18],
//       [moment(`2023-06-01`, "YYYY-MM-DD").valueOf(), 25],
//       [moment(`2023-07-01`, "YYYY-MM-DD").valueOf(), 41],
//       [moment(`2023-08-01`, "YYYY-MM-DD").valueOf(), 15],
//       [moment(`2023-09-01`, "YYYY-MM-DD").valueOf(), 16],
//       [moment(`2023-10-01`, "YYYY-MM-DD").valueOf(), 19],
//       [moment(`2023-11-01`, "YYYY-MM-DD").valueOf(), 20],
//       [moment(`2023-12-01`, "YYYY-MM-DD").valueOf(), 24],
//     ],
//   },
// ];

const Dashboard = () => {
  const dispatch = useDispatch();
  const seriesPerMonth = useSelector(getShippableByMonth);
  // const seriesPerYear = useSelector(getShippableByYear);

  useEffect(() => {
    dispatch(fetchExpectancyRequest());
    dispatch(fetchShippableRequest());
    dispatch(fetchAdvanceRequest());
  }, [dispatch]);
  return (
    <>
      {/* {console.log(seriesPerYear)} */}
      <div className="container m-auto">
        <div className="grid grid-cols-9 gap-4">
          <div className="space-y-4 col-span-2">
            <Card sx={{ height: "260px" }}>
              <h2 className="text-base text-center mt-3">Total Entregables</h2>
              <div className="grid grid-cols-2 gap-2 px-2 mt-3">
                <div className="flex justify-around items-center">
                  <img
                    src={securityIcon}
                    alt="icono_seguridad"
                    className="w-10 h-10 object-contain"
                  />
                  <div className="border shadow-sm w-24">
                    <div className="bg-orange-500 text-white">
                      <h4 className="text-xs text-center py-1">Seguridad</h4>
                    </div>
                    <div className="text-center text-md py-1 font-bold">
                      110
                    </div>
                  </div>
                </div>
                <div className="flex justify-around items-center">
                  <img
                    src={calidadIcon}
                    alt="icono_seguridad"
                    className="w-10 h-10 object-contain"
                  />
                  <div className="border shadow-sm w-24">
                    <div className="bg-orange-500 text-white">
                      <h4 className="text-xs text-center py-1">Calidad</h4>
                    </div>
                    <div className="text-center text-md py-1 font-bold">78</div>
                  </div>
                </div>
                <div className="flex justify-around items-center">
                  <img
                    src={rhIcon}
                    alt="icono_seguridad"
                    className="w-10 h-10 object-contain"
                  />
                  <div className="border shadow-sm w-24">
                    <div className="bg-orange-500 text-white">
                      <h4 className="text-xs text-center py-1">RH</h4>
                    </div>
                    <div className="text-center text-md py-1 font-bold">82</div>
                  </div>
                </div>
                <div className="flex justify-around items-center">
                  <img
                    src={produccionIcon}
                    alt="icono_seguridad"
                    className="w-10 h-10 object-contain"
                  />
                  <div className="border shadow-sm w-24">
                    <div className="bg-orange-500 text-white">
                      <h4 className="text-xs text-center py-1">Producción</h4>
                    </div>
                    <div className="text-center text-md py-1 font-bold">
                      175
                    </div>
                  </div>
                </div>
                <div className="flex justify-around items-center">
                  <img
                    src={matenimientoIcon}
                    alt="icono_seguridad"
                    className="w-10 h-10 object-contain"
                  />
                  <div className="border shadow-sm w-24">
                    <div className="bg-orange-500 text-white">
                      <h4 className="text-xs text-center py-1">Mtto.</h4>
                    </div>
                    <div className="text-center text-md py-1 font-bold">
                      234
                    </div>
                  </div>
                </div>
                <div className="flex justify-around items-center">
                  <div className="w-10 h-10"></div>
                  <div className="border shadow-sm w-24">
                    <div className="bg-blue-500 text-white">
                      <h4 className="text-xs text-center py-1">Total</h4>
                    </div>
                    <div className="text-center text-md py-1 font-bold">
                      679
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-4 col-span-4">
            <Card sx={{ height: "260px" }}>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <GaugeSeries height={250} title="Cumplimiento Total" />
                <GaugeSeries height={250} title="Cumplimiento YTD" />
              </div>
            </Card>
          </div>
          <div className="space-y-4 col-span-3">
            <Card sx={{ height: "260px" }}>
              <div className="grid grid-cols-3 gap-2 gap-y-0 mt-3">
                <SolidGauge value={100} name="Seguridad" height={120} />
                <SolidGauge value={20} name="Calidad" height={120} />
                <SolidGauge value={100} name="RH" height={120} />
                <SolidGauge value={20} name="Producción" height={120} />
                <SolidGauge value={20} name="Mantenimiento" height={120} />
              </div>
            </Card>
          </div>
          <div className="space-y-4 col-span-2">
            <Card sx={{ height: "486px" }}>
              <h2 className="text-base text-center mt-3">Champions Pilares</h2>
            </Card>
          </div>
          <div className="space-y-4 col-span-2">
            <Card sx={{ height: "486px" }}>
              <h2 className="text-base text-center mt-3">
                Entregables Energizador
              </h2>
              <div className="px-2">
                <StackedBar
                  height={450}
                  categories={dataEnergizer.categories}
                  series={dataEnergizer.series}
                />
              </div>
            </Card>
          </div>
          <div className="space-y-4 col-span-2">
            <Card sx={{ height: "486px" }}>
              <h2 className="text-base text-center mt-3">Avance Entregables</h2>
              <StackedBar
                height={450}
                categories={dataAdvance.categories}
                series={dataAdvance.series}
              />
            </Card>
          </div>
          <div className="space-y-4 col-span-3">
            <Card sx={{ height: "235px" }}>
              <h2 className="text-base text-center mt-3">
                Cumplimiento mensual
              </h2>
              <ColumnChart height={200} series={seriesPerMonth} />
            </Card>
            <Card sx={{ height: "235px" }}>
              <h2 className="text-base text-center mt-3">Cumplimiento anual</h2>
              <ColumnChart height={200} series={seriesPerYear} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
