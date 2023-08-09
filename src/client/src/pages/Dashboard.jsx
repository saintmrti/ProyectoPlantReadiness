import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import _ from "lodash";

// import securityIcon from "../img/securityIcon.png";
// import rhIcon from "../img/rhIcon.png";
// import calidadIcon from "../img/calidadIcon.png";
// import produccionIcon from "../img/produccionIcon.png";
// import matenimientoIcon from "../img/mantenimientoIcon.png";
import energizer1 from "../img/energizer1.png";
import energizer2 from "../img/energizer2.jpg";
import energizer3 from "../img/energizer3.jpg";
import energizer4 from "../img/energizer4.jpg";
// import energizer5 from "../img/energizer5.png";
import energizer6 from "../img/energizer6.jpg";
import energizer7 from "../img/energizer7.jpg";
import GaugeSeries from "../components/GaugeCharts/GaugeSeries";
import SolidGauge from "../components/GaugeCharts/SolidGauge";
import StackedBar from "../components/BarCharts/StackedBar";
import ColumnChart from "../components/BarCharts/ColumnChart";
import FilterButton from "../components/ButtonGroup";
import { kpisRequest } from "../slices/kpis";
import { getSummaryKpis } from "../selectors/kpis";
import ProgressBar from "../components/ProgressBar";
import { Spinner } from '../components/Spinner';
import { Error } from '../components/Error';

// const dataEnergizer = {
//   categories: [
//     "JLMO",
//     "ABG",
//     "ACAB",
//     "Fatima Elizondo",
//     "O. Argueta",
//     "C. Sánchez",
//     "M. Nuñez",
//     "A. Gaspar",
//     "C. Chapa",
//     "Claudia Chapa",
//     "JACH",
//     "MNN",
//     "Carlos Camacho",
//     "JCM",
//     "OA",
//     "R. Gonzales",
//     "A. Montero",
//     "C. Camacho",
//     "A. Anguiano",
//     "J. Marroquin",
//   ],
//   series: [
//     6, 6, 7, 7, 8, 12, 12, 12, 13, 13, 14, 16, 16, 36, 47, 52, 70, 76, 88, 140,
//   ],
// };

// const dataAdvance = {
//   categories: ["100%", "76-99%", "51-75%", "31-50%", "1-30%", "0%"],
//   series: [137, 63, 80, 48, 79, 500],
// };

// const seriesPerYear = [
//   {
//     name: "Plan",
//     data: [
//       [moment(`2021-1-01`, "YYYY-MM-DD").valueOf(), 240],
//       [moment(`2022-1-01`, "YYYY-MM-DD").valueOf(), 305],
//       [moment(`2023-1-01`, "YYYY-MM-DD").valueOf(), 438],
//       [moment(`2024-1-01`, "YYYY-MM-DD").valueOf(), 239],
//       [moment(`2025-1-01`, "YYYY-MM-DD").valueOf(), 150],
//     ],
//   },
//   {
//     name: "Real",
//     data: [
//       [moment(`2021-1-01`, "YYYY-MM-DD").valueOf(), 140],
//       [moment(`2022-1-01`, "YYYY-MM-DD").valueOf(), 290],
//       [moment(`2023-1-01`, "YYYY-MM-DD").valueOf(), 115],
//       [moment(`2024-1-01`, "YYYY-MM-DD").valueOf(), 206],
//       [moment(`2025-1-01`, "YYYY-MM-DD").valueOf(), 200],
//     ],
//   },
// ];

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
  const summaryKpis = useSelector(getSummaryKpis);
  const { isFetching, didError } = useSelector((state) => state.kpis);

  const [isFilterButtonVisible, setIsFilterButtonVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    phase: 0,
    priority: "P0",
    weighting: 0,
  });

  const toggleFilterButton = () => {
    setIsFilterButtonVisible((prev) => !prev);
  };

  const handleBtnClickFiler = () => {
    dispatch(kpisRequest(selectedFilter));
  }

  useEffect(() => {
    dispatch(kpisRequest(selectedFilter));
  }, []);
  return (
    <>
      <div className="container mx-auto">
        {isFetching ? (
          <Spinner />
        ) : didError ? (
          <Error />
        ) : _.isEmpty(summaryKpis) ? (
          <>
            {isFilterButtonVisible && <FilterButton setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} handleBtnClickFiler={handleBtnClickFiler}/>}
            <div className="h-80 flex items-end justify-center">
               <p className="text-lg text-center">
                 Lo sentimos, no tenemos datos para mostrar
               </p>
            </div>
          </>
        ) : (
          <>
              <button className="ml-2" onClick={toggleFilterButton}>
                Mostrar / Ocultar
              </button>
              {isFilterButtonVisible && <FilterButton setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} handleBtnClickFiler={handleBtnClickFiler}/>}
              {/* {console.log(selectedFilter)} */}
              <div className="grid grid-cols-9 gap-4">
                <div className="space-y-4 col-span-2">
                  <Card sx={{ height: "260px" }}>
                    {/* <h2 className="text-base text-center mt-3">
                      Total Entregables
                    </h2> */}
                    <div className="mx-4 mt-2">
                      <div className="flex justify-between pr-2">
                        <p className="xs">Seguridad</p>
                        <p className="xs">
                          {summaryKpis?.shippable_total["1"]?.total}
                        </p>
                      </div>
                      <ProgressBar
                        currentProgress={
                          summaryKpis?.shippable_total["1"]?.total ?? 0
                        }
                        goal={summaryKpis?.shippable_total["0"]?.total}
                      />
                    </div>
                    <div className="mx-4 mt-2">
                      <div className="flex justify-between pr-2">
                        <p className="xs">Calidad</p>
                        <p className="xs">
                          {summaryKpis?.shippable_total["2"]?.total ?? 0}
                        </p>
                      </div>
                      <ProgressBar
                        currentProgress={
                          summaryKpis?.shippable_total["2"]?.total ?? 0
                        }
                        goal={summaryKpis?.shippable_total["0"]?.total}
                      />
                    </div>
                    <div className="mx-4 mt-2">
                      <div className="flex justify-between pr-2">
                        <p className="xs">RH</p>
                        <p className="xs">
                          {summaryKpis?.shippable_total["3"]?.total ?? 0}
                        </p>
                      </div>
                      <ProgressBar
                        currentProgress={
                          summaryKpis?.shippable_total["3"]?.total ?? 0
                        }
                        goal={summaryKpis?.shippable_total["0"]?.total}
                      />
                    </div>
                    <div className="mx-4 mt-2">
                      <div className="flex justify-between pr-2">
                        <p className="xs">Producción</p>
                        <p className="xs">
                          {summaryKpis?.shippable_total["4"]?.total ?? 0}
                        </p>
                      </div>
                      <ProgressBar
                        currentProgress={
                          summaryKpis?.shippable_total["4"]?.total ?? 0
                        }
                        goal={summaryKpis?.shippable_total["0"]?.total}
                      />
                    </div>
                    <div className="mx-4 mt-2">
                      <div className="flex justify-between pr-2">
                        <p className="xs">Mantenimiento</p>
                        <p className="xs">
                          {summaryKpis?.shippable_total["5"]?.total ?? 0}
                        </p>
                      </div>
                      <ProgressBar
                        currentProgress={
                          summaryKpis?.shippable_total["5"]?.total ?? 0
                        }
                        goal={summaryKpis?.shippable_total["0"]?.total}
                      />
                    </div>
                  </Card>
                </div>
                <div className="space-y-4 col-span-4">
                  <Card sx={{ height: "260px" }}>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <GaugeSeries
                        height={250}
                        title="Cumplimiento Total"
                        total={summaryKpis?.compliance_total?.totales}
                        value={summaryKpis?.compliance_total?.completados}
                        rate={summaryKpis?.compliance_total?.porcentaje}
                      />
                      <GaugeSeries
                        height={250}
                        title="Cumplimiento YTD"
                        total={summaryKpis?.compliance_YTD?.totales}
                        value={summaryKpis?.compliance_YTD?.completados}
                        rate={summaryKpis?.compliance_YTD?.porcentaje}
                      />
                    </div>
                  </Card>
                </div>
                <div className="space-y-4 col-span-3">
                  <Card sx={{ height: "260px" }}>
                    <div className="grid grid-cols-3 gap-2 gap-y-0 mt-3">
                      <SolidGauge
                        name="Seguridad"
                        height={120}
                        value={
                          summaryKpis?.compliance_headings["1"]?.datos
                            ?.completados
                        }
                        total={
                          summaryKpis?.compliance_headings["1"]?.datos?.totales
                        }
                        rate={
                          summaryKpis?.compliance_headings["1"]?.datos
                            ?.porcentaje
                        }
                      />
                      <SolidGauge
                        name="Calidad"
                        height={120}
                        value={
                          summaryKpis?.compliance_headings["2"]?.datos
                            ?.completados
                        }
                        total={
                          summaryKpis?.compliance_headings["2"]?.datos?.totales
                        }
                        rate={
                          summaryKpis?.compliance_headings["2"]?.datos
                            ?.porcentaje
                        }
                      />
                      <SolidGauge
                        name="RH"
                        height={120}
                        value={
                          summaryKpis?.compliance_headings["3"]?.datos
                            ?.completados
                        }
                        total={
                          summaryKpis?.compliance_headings["3"]?.datos?.totales
                        }
                        rate={
                          summaryKpis?.compliance_headings["3"]?.datos
                            ?.porcentaje
                        }
                      />
                      <SolidGauge
                        name="Producción"
                        height={120}
                        value={
                          summaryKpis?.compliance_headings["4"]?.datos
                            ?.completados
                        }
                        total={
                          summaryKpis?.compliance_headings["4"]?.datos?.totales
                        }
                        rate={
                          summaryKpis?.compliance_headings["4"]?.datos
                            ?.porcentaje
                        }
                      />
                      <SolidGauge
                        name="Mantenimiento"
                        height={120}
                        value={
                          summaryKpis?.compliance_headings["5"]?.datos
                            ?.completados
                        }
                        total={
                          summaryKpis?.compliance_headings["5"]?.datos?.totales
                        }
                        rate={
                          summaryKpis?.compliance_headings["5"]?.datos
                            ?.porcentaje
                        }
                      />
                    </div>
                  </Card>
                </div>
                <div className="space-y-4 col-span-2">
                  <Card sx={{ height: "486px" }}>
                    <h2 className="text-base text-center mt-3">
                      Champions Pilares
                    </h2>
                    <div className="px-4 mt-1">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          bgcolor: "bgcolor",
                          padding: "5px",
                          borderRadius: "8px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={energizer7}
                          sx={{ width: 56, height: 56 }}
                        />
                        <div className="w-full pl-14">
                          <p className="text-lg">J. J. Diaz</p>
                          <p className="text-sm text-gray-600">Champion UEN</p>
                        </div>
                      </Box>
                    </div>
                    <div className="px-4 mt-2">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          bgcolor: "bgcolor",
                          padding: "5px",
                          borderRadius: "8px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={energizer1}
                          sx={{ width: 56, height: 56 }}
                        />
                        <div className="w-full pl-14">
                          <p className="text-lg">C. Camacho</p>
                          <p className="text-sm text-gray-600">Seguridad</p>
                        </div>
                      </Box>
                    </div>
                    <div className="px-4 mt-2">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          bgcolor: "bgcolor",
                          padding: "5px",
                          borderRadius: "8px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={energizer2}
                          sx={{ width: 56, height: 56 }}
                        />
                        <div className="w-full pl-14">
                          <p className="text-lg">Y. Tadeo</p>
                          <p className="text-sm text-gray-600">Calidad</p>
                        </div>
                      </Box>
                    </div>
                    <div className="px-4 mt-2">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          bgcolor: "bgcolor",
                          padding: "5px",
                          borderRadius: "8px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={energizer3}
                          sx={{ width: 56, height: 56 }}
                        />
                        <div className="w-full pl-14">
                          <p className="text-lg">R. Parga</p>
                          <p className="text-sm text-gray-600">RH</p>
                        </div>
                      </Box>
                    </div>
                    <div className="px-4 mt-2">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          bgcolor: "bgcolor",
                          padding: "5px",
                          borderRadius: "8px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={energizer4}
                          sx={{ width: 56, height: 56 }}
                        />
                        <div className="w-full pl-14">
                          <p className="text-lg">J. Chapa</p>
                          <p className="text-sm text-gray-600">Producción</p>
                        </div>
                      </Box>
                    </div>
                    <div className="px-4 mt-2">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          bgcolor: "bgcolor",
                          padding: "5px",
                          borderRadius: "8px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={energizer6}
                          sx={{ width: 56, height: 56 }}
                        />
                        <div className="w-full pl-14">
                          <p className="text-lg">J. Marroquin</p>
                          <p className="text-sm text-gray-600">Mantenimiento</p>
                        </div>
                      </Box>
                    </div>
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
                        categories={
                          summaryKpis?.shippable_energizer?.categories
                        }
                        series={summaryKpis?.shippable_energizer?.series}
                      />
                    </div>
                  </Card>
                </div>
                <div className="space-y-4 col-span-2">
                  <Card sx={{ height: "486px" }}>
                    <h2 className="text-base text-center mt-3">
                      Avance Entregables
                    </h2>
                    <StackedBar
                      height={450}
                      categories={summaryKpis?.shippable_advance?.categories}
                      series={summaryKpis?.shippable_advance?.series}
                    />
                  </Card>
                </div>
                <div className="space-y-4 col-span-3">
                  <Card sx={{ height: "235px" }}>
                    <h2 className="text-base text-center mt-3">
                      Cumplimiento mensual
                    </h2>
                    <ColumnChart
                      height={200}
                      series={summaryKpis?.shippable_month}
                    />
                  </Card>
                  <Card sx={{ height: "235px" }}>
                    <h2 className="text-base text-center mt-3">
                      Cumplimiento anual
                    </h2>
                    <ColumnChart
                      height={200}
                      series={summaryKpis?.shippable_year}
                    />
                  </Card>
                </div>
              </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
