import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from "@mui/icons-material/Delete";

import { insertPhaseRequest } from "../../slices/phase";
import {
  insertMachineRequest,
  deleteMachineRequest,
} from "../../slices/machines";
import { textFieldValidation } from "./validated";

const PhaseForm = ({ setOpen, data, idGrupo }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [machine, setMachine] = useState("");
  const { isFetchingInsert, isFetchingDelete } = useSelector(
    (state) => state.machines
  );

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
        <div className="mb-10">
          <div className="flex justify-center items-center mb-5">
            <label className="px-4">Nombre</label>
            <TextField
              sx={{ width: "15rem" }}
              type="text"
              label="Fase"
              autoComplete="off"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name", {
                required: true,
                validate: (value) => textFieldValidation(value, 20),
              })}
            />
          </div>
          {_.isEmpty(data) ? (
            <Typography
              sx={{ textAlign: "center", mb: 2 }}
              color="primary.main"
            >
              No tienes maquinas disponibles
            </Typography>
          ) : (
            <div className="grid grid-cols-3 gap-2 space-x-2 mb-5">
              {_.map(data, (item) => (
                <FormGroup
                  key={item.id}
                  sx={{
                    display: "flex",
                    itemsAlign: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <FormControlLabel
                    sx={{ mr: 0 }}
                    control={
                      <Checkbox
                        value={item.id}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={item.maquina}
                  />
                  <IconButton
                    aria-label="delete"
                    disabled={isFetchingDelete}
                    onClick={() =>
                      dispatch(deleteMachineRequest({ idMaquina: item.id }))
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </FormGroup>
              ))}
            </div>
          )}
          <div className="flex justify-center items-center">
            <TextField
              label="Maquina"
              autoComplete="off"
              onChange={(e) => setMachine(e.target.value)}
              value={machine}
              inputProps={{ maxLength: 20 }}
              helperText={machine.length === 20 && "Máximo 20 caracteres"}
              sx={{ width: "15rem", mr: 2 }}
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
