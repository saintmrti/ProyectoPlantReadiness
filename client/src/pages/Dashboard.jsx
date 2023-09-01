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
import energizer1 from "../assets/img/energizer1.png";
import energizer2 from "../assets/img/energizer2.jpg";
import energizer3 from "../assets/img/energizer3.jpg";
import energizer4 from "../assets/img/energizer4.jpg";
import energizer6 from "../assets/img/energizer6.jpg";
import energizer7 from "../assets/img/energizer7.jpg";
import GaugeSeries from "../components/GaugeCharts/GaugeSeries";
import SolidGauge from "../components/GaugeCharts/SolidGauge";
import StackedBar from "../components/BarCharts/StackedBar";
import ColumnChart from "../components/BarCharts/ColumnChart";
// import MachineTable from "../components/Tables/MachineTable";
import FilterButton from "../components/ButtonGroup";
import { kpisRequest } from "../slices/kpis";
import { getSummaryKpis } from "../selectors/kpis";
import ProgressBar from "../components/ProgressBar";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";
// import { maquinas } from "../components/Tables/data";

// const cumplimientoGral = [
//   {
//     name: "Plan",
//     data: [
//       ["Fase 1", 46],
//       ["Fase 2", 38],
//       ["Gral", 43],
//     ],
//   },
//   {
//     name: "Real",
//     data: [
//       ["Fase 1", 54],
//       ["Fase 2", 31],
//       ["Gral", 44],
//     ],
//   },
// ];

// const cumplimientoYTD = [
//   {
//     name: "Plan",
//     data: [
//       ["Fase 1", 100],
//       ["Fase 2", 100],
//       ["Gral", 100],
//     ],
//   },
//   {
//     name: "Real",
//     data: [
//       ["Fase 1", 116],
//       ["Fase 2", 81],
//       ["Gral", 103],
//     ],
//   },
// ];

// const categories = ["Fase 1", "Fase 2", "Gral."];

const Dashboard = () => {
  const dispatch = useDispatch();
  const summaryKpis = useSelector(getSummaryKpis);
  const { isFetching, didError } = useSelector((state) => state.kpis);

  const [isFilterButtonVisible, setIsFilterButtonVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    phase: [],
    priority: [],
  });

  const toggleFilterButton = () => {
    setIsFilterButtonVisible((prev) => !prev);
  };

  const handleBtnClickFilter = () => {
    const phaseString = _.join(selectedFilter.phase, ",");
    const priorityString = _.join(selectedFilter.priority, ",");
    const newFilter = {
      phase: phaseString,
      priority: priorityString,
    };

    dispatch(kpisRequest(newFilter));
  };

  useEffect(() => {
    const phaseString = _.join(selectedFilter.phase, ",");
    const priorityString = _.join(selectedFilter.priority, ",");
    const newFilter = {
      phase: phaseString,
      priority: priorityString,
    };
    dispatch(kpisRequest(newFilter));
  }, []);
  return (
    <>
      <div className="">
        {isFetching ? (
          <Spinner />
        ) : didError ? (
          <Error />
        ) : _.isEmpty(summaryKpis) ? (
          <>
            {isFilterButtonVisible && (
              <FilterButton
                setSelectedFilter={setSelectedFilter}
                selectedFilter={selectedFilter}
                handleBtnClickFilter={handleBtnClickFilter}
              />
            )}
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
            {isFilterButtonVisible && (
              <FilterButton
                setSelectedFilter={setSelectedFilter}
                selectedFilter={selectedFilter}
                handleBtnClickFilter={handleBtnClickFilter}
              />
            )}
            {console.log(summaryKpis)}
            <div className="grid grid-cols-9 gap-2">
              <div className="col-span-2">
                <Card sx={{ height: "285px" }}>
                  {/* <h2 className="text-base text-center mt-3">
                      Total Entregables
                    </h2> */}
                  <div className="mx-4 mt-2">
                    <ProgressBar
                      rubro={summaryKpis?.shippable_total["1"]?.rubro}
                      real={summaryKpis?.shippable_total["1"]?.reales}
                      plan={summaryKpis?.shippable_total["1"]?.planes}
                      total={summaryKpis?.shippable_total["1"]?.totales}
                    />
                  </div>
                  <div className="mx-4 mt-2">
                    <ProgressBar
                      rubro={summaryKpis?.shippable_total["2"]?.rubro}
                      real={summaryKpis?.shippable_total["2"]?.reales}
                      plan={summaryKpis?.shippable_total["2"]?.planes}
                      total={summaryKpis?.shippable_total["2"]?.totales}
                    />
                  </div>
                  <div className="mx-4 mt-2">
                    <ProgressBar
                      rubro="RH"
                      real={summaryKpis?.shippable_total["3"]?.reales}
                      plan={summaryKpis?.shippable_total["3"]?.planes}
                      total={summaryKpis?.shippable_total["3"]?.totales}
                    />
                  </div>
                  <div className="mx-4 mt-2">
                    <ProgressBar
                      rubro="Producción"
                      real={summaryKpis?.shippable_total["4"]?.reales}
                      plan={summaryKpis?.shippable_total["4"]?.planes}
                      total={summaryKpis?.shippable_total["4"]?.totales}
                    />
                  </div>
                  <div className="mx-4 mt-2">
                    <ProgressBar
                      rubro="Mtto"
                      real={summaryKpis?.shippable_total["5"]?.reales}
                      plan={summaryKpis?.shippable_total["5"]?.planes}
                      total={summaryKpis?.shippable_total["5"]?.totales}
                    />
                  </div>
                </Card>
              </div>
              <div className="col-span-4">
                <Card sx={{ height: "285px" }}>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <GaugeSeries
                      height={280}
                      title="Cumplimiento Total"
                      total={summaryKpis?.compliance_total[0]?.totales}
                      value={summaryKpis?.compliance_total[0]?.completados}
                      rate={summaryKpis?.compliance_total[0]?.porcentaje}
                    />
                    <GaugeSeries
                      height={280}
                      title="Cumplimiento YTD"
                      total={summaryKpis?.compliance_YTD[0]?.totales}
                      value={summaryKpis?.compliance_YTD[0]?.completados}
                      rate={summaryKpis?.compliance_YTD[0]?.porcentaje}
                    />
                  </div>
                </Card>
              </div>
              <div className="col-span-3">
                <Card sx={{ height: "285px" }}>
                  <div className="grid grid-cols-3 gap-2 gap-y-0 mt-3">
                    <SolidGauge
                      name="Seguridad"
                      height={130}
                      value={summaryKpis?.compliance_headings["1"]?.completados}
                      total={summaryKpis?.compliance_headings["1"]?.totales}
                      rate={summaryKpis?.compliance_headings["1"]?.porcentaje}
                    />
                    <SolidGauge
                      name="Calidad"
                      height={130}
                      value={summaryKpis?.compliance_headings["2"]?.completados}
                      total={summaryKpis?.compliance_headings["2"]?.totales}
                      rate={summaryKpis?.compliance_headings["2"]?.porcentaje}
                    />
                    <SolidGauge
                      name="RH"
                      height={130}
                      value={summaryKpis?.compliance_headings["3"]?.completados}
                      total={summaryKpis?.compliance_headings["3"]?.totales}
                      rate={summaryKpis?.compliance_headings["3"]?.porcentaje}
                    />
                    <SolidGauge
                      name="Producción"
                      height={130}
                      value={summaryKpis?.compliance_headings["4"]?.completados}
                      total={summaryKpis?.compliance_headings["4"]?.totales}
                      rate={summaryKpis?.compliance_headings["4"]?.porcentaje}
                    />
                    <SolidGauge
                      name="Mantenimiento"
                      height={130}
                      value={summaryKpis?.compliance_headings["5"]?.completados}
                      total={summaryKpis?.compliance_headings["5"]?.totales}
                      rate={summaryKpis?.compliance_headings["5"]?.porcentaje}
                    />
                  </div>
                </Card>
              </div>
              <div className="col-span-2">
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
                        <p className="text-lg">J. L. Díaz</p>
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
              <div className="col-span-2">
                <Card sx={{ height: "486px" }}>
                  <h2 className="text-base text-center mt-3">
                    Entregables Energizador
                  </h2>
                  <div className="px-2">
                    <StackedBar
                      height={450}
                      categories={summaryKpis?.shippable_energizer?.categories}
                      series={summaryKpis?.shippable_energizer?.series}
                    />
                  </div>
                </Card>
              </div>
              <div className="col-span-2">
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
              <div className="space-y-2 col-span-3">
                <Card sx={{ height: "239px" }}>
                  <h2 className="text-base text-center mt-3">
                    Cumplimiento mensual
                  </h2>
                  <ColumnChart
                    height={200}
                    series={summaryKpis?.shippable_month}
                  />
                </Card>
                <Card sx={{ height: "239px" }}>
                  <h2 className="text-base text-center mt-3">
                    Cumplimiento anual
                  </h2>
                  <ColumnChart
                    height={200}
                    series={summaryKpis?.shippable_year}
                  />
                </Card>
              </div>
              {/* <div className="col-span-3">
                <Card sx={{ height: "300px" }}>
                  <h2 className="text-base text-center mt-3">
                    Cumplimiento por fase total
                  </h2>
                  <ColumnChart
                    height={250}
                    series={cumplimientoGral}
                    categories={categories}
                  />
                </Card>
              </div>
              <div className="col-span-3">
                <Card sx={{ height: "300px" }}>
                  <h2 className="text-base text-center mt-3">
                    Cumplimiento por fase YTD
                  </h2>
                  <ColumnChart
                    height={250}
                    series={cumplimientoYTD}
                    categories={categories}
                  />
                </Card>
              </div>
              <div className="col-span-3">
                <Card sx={{ height: "300px" }}>
                  <h2 className="text-base text-center mt-3">
                    Avance por máquina
                  </h2>
                  <MachineTable tableValues={maquinas} />
                </Card>
              </div> */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
