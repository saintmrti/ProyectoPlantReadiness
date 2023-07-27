import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import _ from "lodash";

import { insertPhaseRequest } from "../../slices/phase";
import { insertMachineRequest } from "../../slices/machines";

const PhaseForm = ({ setOpen, data, idGrupo }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [machine, setMachine] = useState("");
  const { isFetchingInsert } = useSelector((state) => state.machines);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedMachines((prevSelectedMachines) => [
        ...prevSelectedMachines,
        { id: value },
      ]);
    } else {
      setSelectedMachines((prevSelectedMachines) =>
        prevSelectedMachines.filter((machine) => machine.id !== value)
      );
    }
  };

  const handleAddMachine = () => {
    dispatch(insertMachineRequest({ machine }));
    setMachine("");
  };

  const onSubmit = (values) => {
    const { name } = values;
    const newPhases = _.map(selectedMachines, (machine) => ({
      idMaquina: machine.id,
      idGrupo: idGrupo,
      fase: name,
    }));
    dispatch(insertPhaseRequest({ newPhases }));
    setOpen(false);
  };

  return (
    <div>
      <form
        className="flex justify-center items-center flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-5 w-full text-center">Nueva fase</h1>
        <div className="mb-5">
          <div className="flex justify-center items-center mb-5">
            <label className="px-4">Nombre</label>
            <TextField
              sx={{ width: "15rem" }}
              type="text"
              label="Fase"
              autoComplete="off"
              {...register("name", { required: true })}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-5">
            {_.map(data, (item) => (
              <FormGroup
                key={item.id}
                sx={{ display: "flex", itemsAlign: "center" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox value={item.id} onChange={handleCheckboxChange} />
                  }
                  label={item.maquina}
                />
              </FormGroup>
            ))}
          </div>
          <div className="flex justify-evenly items-center">
            <TextField
              sx={{ width: "15rem" }}
              label="Maquina"
              autoComplete="off"
              onChange={(e) => setMachine(e.target.value)}
              value={machine}
            />
            <div>
              <Button
                onClick={handleAddMachine}
                variant="outlined"
                disabled={machine === "" ? true : false}
              >
                {isFetchingInsert ? "Cargando..." : "Agregar maquina"}
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button
            type="submit"
            variant="contained"
            disabled={selectedMachines.length === 0}
          >
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PhaseForm;
