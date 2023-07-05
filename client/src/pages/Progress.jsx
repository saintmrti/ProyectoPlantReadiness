import { Tabs, Button, Modal } from "@rewind-ui/core";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import MachineForm from "../components/Forms/MachineForm";
import MachineTable from "../components/Tables/MachineTable";
// import { avanceEntrable } from "../components/Tables/data";
import { useState, useEffect } from "react";
import { machinesRequest } from "../slices/machines";
import { fetchAdvanceRequest } from "../slices/advance";
import { groupedByIdPhase } from "../selectors/advance";

const Progress = () => {
  const { idEntregable } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { list } = useSelector((state) => state.machines);
  const data = useSelector(groupedByIdPhase);

  useEffect(() => {
    dispatch(machinesRequest());
    dispatch(fetchAdvanceRequest({ idEntregable }));
  }, [dispatch, idEntregable]);
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <IconButton onClick={() => navigate("/")}>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Todos los nuevos procesos incluidos perifericos
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
            <Tabs.Tab anchor="tab-1">Fase 1</Tabs.Tab>
          </Tabs.List>
          {_.map(data, (item, index) => (
            <Tabs.Content anchor="tab-1" key={index}>
              <MachineTable data={item} />
            </Tabs.Content>
          ))}
        </Tabs>
        <Modal size="md" open={open} onClose={() => setOpen(false)}>
          <MachineForm
            setOpen={setOpen}
            data={list}
            idEntregable={idEntregable}
          />
        </Modal>
      </div>
    </>
  );
};

export default Progress;
