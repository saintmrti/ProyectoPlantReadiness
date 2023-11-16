import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import _ from "lodash";

import GaugeSeries from "../components/GaugeCharts/GaugeSeries";
import SolidGauge from "../components/GaugeCharts/SolidGauge";
import StackedBar from "../components/BarCharts/StackedBar";
import ColumnChart from "../components/BarCharts/ColumnChart";
import MachineTable from "../components/Tables/MachineTable";
import { FilterButton } from "../components/FilterButton";
import { fetchKpisRequest } from "../slices/kpis";
import { fetchChampionsRequest } from "../slices/champions";
import { fetchPhaseRequest } from "../slices/phase";
import { getSummaryKpis } from "../selectors/kpis";
import { DashboardBar } from "../components/ProgressBar/DashboardBar";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";

const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { idProyecto } = useParams();
  const summaryKpis = useSelector(getSummaryKpis);
  const { isFetching, didError } = useSelector((state) => state.kpis);
  const { list: champions } = useSelector((state) => state.champions);
  const { list: phases } = useSelector((state) => state.phase);
  const { tokenData } = useSelector((state) => state.auth);

  const arrayPhases = _.map(phases, "id");

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
      idProyecto,
    };

    dispatch(fetchKpisRequest(newFilter));
  };

  useEffect(() => {
    const phaseString = _.join(selectedFilter.phase, ",");
    const priorityString = _.join(selectedFilter.priority, ",");
    const newFilter = {
      phase: phaseString,
      priority: priorityString,
      idProyecto,
    };
    dispatch(fetchKpisRequest(newFilter));
    dispatch(fetchPhaseRequest({ idProyecto }));
    dispatch(fetchChampionsRequest({ idProyecto }));
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
                idProyecto={idProyecto}
                phases={arrayPhases}
                tokenData={tokenData}
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
            <Button
              variant="text"
              onClick={toggleFilterButton}
              sx={{ ml: 1, padding: 0 }}
            >
              Mostrar / Ocultar
            </Button>
            {isFilterButtonVisible && (
              <FilterButton
                setSelectedFilter={setSelectedFilter}
                selectedFilter={selectedFilter}
                handleBtnClickFilter={handleBtnClickFilter}
                idProyecto={idProyecto}
                phases={arrayPhases}
                tokenData={tokenData}
              />
            )}
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4">
                <Card sx={{ height: "100%", padding: "10px 15px" }}>
                  <div className="text-base text-center">
                    Avance Entregables
                  </div>
                  {_.map(summaryKpis?.shippable_total, (item) => (
                    <DashboardBar
                      key={item?.Id}
                      rubro={item?.rubro}
                      real={item?.reales}
                      plan={item?.planes}
                      total={item?.totales}
                      date={item?.fechaHoy}
                    />
                  ))}
                </Card>
              </div>
              <div className="col-span-8">
                <Card sx={{ height: "100%", padding: "10px 10px" }}>
                  <div className="text-base text-center mb-2">
                    Avance por máquina
                  </div>
                  <MachineTable
                    data={summaryKpis?.advanceMachines}
                    rubros={summaryKpis?.headingMachines}
                  />
                </Card>
              </div>
              <div className="col-span-4">
                <Card sx={{ height: "100%", padding: 1 }}>
                  <div className="text-base text-center">Champions Pilares</div>
                  {_.map(champions, (item) => (
                    <div className="mt-2 px-4" key={item.id}>
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
                          alt={item?.nombre}
                          src={item?.imagen}
                          sx={{ width: 40, height: 40 }}
                        />
                        <div className="w-full flex justify-center">
                          <div className="w-36">
                            <p className="text-sm">{item?.nombre}</p>
                            <p
                              className="text-sm"
                              style={{ color: theme.palette.text.secondary }}
                            >
                              {item?.rubro}
                            </p>
                          </div>
                        </div>
                      </Box>
                    </div>
                  ))}
                </Card>
              </div>
              <div className="col-span-4 space-y-2">
                <Card sx={{ height: "49%" }}>
                  <div className="text-base text-center mt-2">
                    Cumplimiento por fase total
                  </div>
                  <ColumnChart
                    height={186}
                    series={summaryKpis?.phasesTotal}
                    categories={summaryKpis?.categoriesPhases?.phasesTotal}
                  />
                </Card>
                <Card sx={{ height: "49%" }}>
                  <div className="text-base text-center mt-2">
                    Cumplimiento por fase YTD
                  </div>
                  <ColumnChart
                    height={186}
                    series={summaryKpis?.phasesYTD}
                    categories={summaryKpis?.categoriesPhases?.phasesYTD}
                  />
                </Card>
              </div>
              <div className="col-span-4 space-y-2">
                <Card sx={{ height: "49%" }}>
                  <div className="text-base text-center mt-2">
                    Cumplimiento mensual
                  </div>
                  <ColumnChart
                    height={180}
                    series={summaryKpis?.shippable_month}
                    cumplience={summaryKpis?.cumplience_month}
                    showYear={false}
                  />
                </Card>
                <Card sx={{ height: "49%" }}>
                  <div className="text-base text-center mt-2">
                    Cumplimiento anual
                  </div>
                  <ColumnChart
                    height={180}
                    series={summaryKpis?.shippable_year}
                    cumplience={summaryKpis?.cumplience_year}
                    showYear={true}
                  />
                </Card>
              </div>
              <div className="col-span-3">
                <Card sx={{ height: "100%" }}>
                  <div className="text-base text-center mt-2">
                    Avance Rubros
                  </div>
                  <div className="grid grid-cols-2 gap-2 gap-y-0">
                    {_.map(summaryKpis?.compliance_headings, (item) => (
                      <SolidGauge
                        key={item.Id}
                        height={130}
                        name={item?.rubro || ""}
                        value={item?.completados || 0}
                        total={item?.totales || 0}
                        rate={item?.porcentaje || 0}
                      />
                    ))}
                  </div>
                </Card>
              </div>
              <div className="col-span-5">
                <Card sx={{ height: "100%" }}>
                  <div className="grid grid-cols-2 gap-2 mt-2 px-1">
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
              <div className="col-span-2">
                <Card sx={{ height: "100%" }}>
                  <div className="text-base text-center mt-2">
                    Entregables Energizador
                  </div>
                  <div className="px-2">
                    <StackedBar
                      height={400}
                      categories={summaryKpis?.shippable_energizer?.categories}
                      series={summaryKpis?.shippable_energizer?.series}
                    />
                  </div>
                </Card>
              </div>
              <div className="col-span-2">
                <Card sx={{ height: "100%" }}>
                  <div className="text-base text-center mt-2">
                    Avance Entregables
                  </div>
                  <StackedBar
                    height={400}
                    categories={summaryKpis?.shippable_advance?.categories}
                    series={summaryKpis?.shippable_advance?.series}
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
