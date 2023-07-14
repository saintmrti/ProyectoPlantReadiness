import { useState, useEffect } from "react";
import { Tabs, Button, Modal } from "@rewind-ui/core";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import MachineForm from "../components/Forms/MachineForm";
import MachineTable from "../components/Tables/MachineTable";
// import { avanceEntrable } from "../components/Tables/data";
import { machinesRequest } from "../slices/machines";
import { fetchAdvanceRequest } from "../slices/advance";
import { groupedByIdPhase } from "../selectors/advance";

const Progress = () => {
  const { idEntregable } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [activeBtn, setActiveBtn] = useState(false);

  // let prevSelectedTab = useRef(selectedTab);

  const { list } = useSelector((state) => state.machines);
  const { summaryAdvanced, shippable, phases } = useSelector(groupedByIdPhase);

  const isFetching = useSelector((state) => state.advance.isFetching);
  const didError = useSelector((state) => state.advance.didError);

  const handleOnClick = () => {
    setSelectedTab(selectedTab + 1);
    setActiveBtn(true);
    setOpen(true);
  };

  const handleOnClose = () => {
    setSelectedTab(phases === 0 ? 1 : phases);
    setActiveBtn(false);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(machinesRequest());
    dispatch(fetchAdvanceRequest());
    phases === 0 ? setSelectedTab(1) : setSelectedTab(phases);
  }, [dispatch, idEntregable, phases]);
  return (
    <>
      <div className="container mx-auto p-4">
        {isFetching ? (
          <div>Cargando...</div>
        ) : didError ? (
          <div>Error</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <IconButton onClick={() => navigate("/")}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className="flex flex-col items-center w-full">
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                  {shippable && shippable[0]?.nombre}
                </h1>
                <div className="w-2/3 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              </div>
              <div></div>
            </div>
            <Button
              color="blue"
              shadow="md"
              className="mb-3"
              onClick={() => setOpen(true)}
            >
              Agregar maquina
            </Button>
            <Tabs defaultTab="tab-1" color="red">
              <Tabs.List>
                {_.map(summaryAdvanced, (item, index) => (
                  <Tabs.Tab
                    anchor={`tab-${index}`}
                    key={index}
                    // onClick={() => setSelectedTab(parseInt(index))}
                  >
                    {`Fase ${item[0].fase}`}
                  </Tabs.Tab>
                ))}
                {_.isEmpty(summaryAdvanced) ? (
                  <div></div>
                ) : (
                  <IconButton onClick={handleOnClick}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                )}
              </Tabs.List>
              {_.map(summaryAdvanced, (item, index) => (
                <Tabs.Content anchor={`tab-${index}`} key={index}>
                  <MachineTable data={item} />
                </Tabs.Content>
              ))}
            </Tabs>
            <Modal size="md" open={open} onClose={() => handleOnClose()}>
              <MachineForm
                setOpen={setOpen}
                data={list}
                idEntregable={idEntregable}
                selectedTab={selectedTab}
                summaryAdvanced={summaryAdvanced}
                activeBtn={activeBtn}
                setActiveBtn={setActiveBtn}
              />
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default Progress;
