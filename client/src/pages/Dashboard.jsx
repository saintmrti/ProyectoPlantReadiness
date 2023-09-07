import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import _ from "lodash";

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
import MachineTable from "../components/Tables/MachineTable";
import FilterButton from "../components/ButtonGroup";
import { kpisRequest } from "../slices/kpis";
import { getSummaryKpis } from "../selectors/kpis";
import ProgressBar from "../components/ProgressBar";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";

const categories = ["Fase 1", "Fase 2", "Gral."];

const Dashboard = () => {
  const dispatch = useDispatch();
  const summaryKpis = useSelector(getSummaryKpis);
  const { isFetching, didError } = useSelector((state) => state.kpis);

  const [isFilterButtonVisible, setIsFilterButtonVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    phase: ["1", "2"],
    priority: ["P1", "P2", "P3"],
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
                <Card sx={{ height: "320px" }}>
                  <div className="text-base text-center mt-2">
                    Avance Entregables
                  </div>
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
                <Card sx={{ height: "320px" }}>
                  <div className="grid grid-cols-2 gap-2 mt-2">
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
                <Card sx={{ height: "320px" }}>
                  <div className="text-base text-center mt-2">
                    Avance Rubros
                  </div>
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
                <Card sx={{ height: "390px" }}>
                  <div className="text-base text-center mt-2">
                    Champions Pilares
                  </div>
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
                        sx={{ width: 40, height: 40 }}
                      />
                      <div className="w-full flex justify-center">
                        <div className="w-36">
                          <p className="text-sm">J. L. Díaz</p>
                          <p className="text-sm text-gray-600">Champion UEN</p>
                        </div>
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
                        sx={{ width: 40, height: 40 }}
                      />
                      <div className="w-full flex justify-center">
                        <div className="w-36">
                          <p className="text-sm">C. Camacho</p>
                          <p className="text-sm text-gray-600">Seguridad</p>
                        </div>
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
                        sx={{ width: 40, height: 40 }}
                      />
                      <div className="w-full flex justify-center">
                        <div className="w-36">
                          <p className="text-sm">Y. Tadeo</p>
                          <p className="text-sm text-gray-600">Calidad</p>
                        </div>
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
                        sx={{ width: 40, height: 40 }}
                      />
                      <div className="w-full flex justify-center">
                        <div className="w-36">
                          <p className="text-sm">R. Parga</p>
                          <p className="text-sm text-gray-600">RH</p>
                        </div>
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
                        sx={{ width: 40, height: 40 }}
                      />
                      <div className="w-full flex justify-center">
                        <div className="w-36">
                          <p className="text-sm">J. Chapa</p>
                          <p className="text-sm text-gray-600">Producción</p>
                        </div>
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
                        sx={{ width: 40, height: 40 }}
                      />
                      <div className="w-full flex justify-center">
                        <div className="w-36">
                          <p className="text-sm">J. Marroquin</p>
                          <p className="text-sm text-gray-600">Mantenimiento</p>
                        </div>
                      </div>
                    </Box>
                  </div>
                </Card>
              </div>
              <div className="col-span-2">
                <Card sx={{ height: "390px" }}>
                  <div className="text-base text-center mt-2">
                    Entregables Energizador
                  </div>
                  <div className="px-2">
                    <StackedBar
                      height={350}
                      categories={summaryKpis?.shippable_energizer?.categories}
                      series={summaryKpis?.shippable_energizer?.series}
                    />
                  </div>
                </Card>
              </div>
              <div className="col-span-2">
                <Card sx={{ height: "390px" }}>
                  <div className="text-base text-center mt-2">
                    Avance Entregables
                  </div>
                  <StackedBar
                    height={350}
                    categories={summaryKpis?.shippable_advance?.categories}
                    series={summaryKpis?.shippable_advance?.series}
                  />
                </Card>
              </div>
              <div className="col-span-3 space-y-2">
                <Card sx={{ height: "191px" }}>
                  <div className="text-base text-center mt-2">
                    Cumplimiento mensual
                  </div>
                  <ColumnChart
                    height={180}
                    series={summaryKpis?.shippable_month}
                    cumplience={summaryKpis?.cumplience_month}
                  />
                </Card>
                <Card sx={{ height: "191px" }}>
                  <div className="text-base text-center mt-2">
                    Cumplimiento anual
                  </div>
                  <ColumnChart
                    height={180}
                    series={summaryKpis?.shippable_year}
                    cumplience={summaryKpis?.cumplience_year}
                  />
                </Card>
              </div>
              <div className="col-span-3 space-y-2">
                <Card sx={{ height: "206px" }}>
                  <div className="text-base text-center mt-2">
                    Cumplimiento por fase total
                  </div>
                  <ColumnChart
                    height={186}
                    series={summaryKpis?.phasesTotal}
                    categories={categories}
                  />
                </Card>
                <Card sx={{ height: "206px" }}>
                  <div className="text-base text-center mt-2">
                    Cumplimiento por fase YTD
                  </div>
                  <ColumnChart
                    height={186}
                    series={summaryKpis?.phasesYTD}
                    categories={categories}
                  />
                </Card>
              </div>
              {/* <div className="col-span-3">
                
              </div> */}
              <div className="col-span-6">
                <Card sx={{ height: "420px" }}>
                  <div className="text-base text-center mt-2 mb-2">
                    Avance por máquina
                  </div>
                  <MachineTable tableValues={summaryKpis?.advanceMachines} />
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
