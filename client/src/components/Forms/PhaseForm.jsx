import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { insertPhaseRequest, updatePhaseRequest } from "../../slices/phase";
// import { insertMachineRequest } from "../../slices/machines";
import { textFieldValidation } from "./validated";
import { getPhase } from "../../selectors/phase";

const PhaseForm = ({ setOpen, idProyecto, editPha }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedMachines, setSelectedMachines] = useState([]);
  const [machine, setMachine] = useState("");
  const phase = useSelector((state) => getPhase(state, editPha));

  const handleAddMachine = () => {
    const newMachines = [...selectedMachines, machine];
    setSelectedMachines(newMachines);
    setMachine("");
  };

  const handleDeleteMachine = (machine) => {
    const modifyMachines = selectedMachines.filter((item) => item !== machine);
    setSelectedMachines(modifyMachines);
  };

  const onSubmit = (values) => {
    const { name } = values;
    if (editPha) {
      const updatePhase = {
        id: phase.id,
        fase: name,
      };
      dispatch(updatePhaseRequest(updatePhase));
    } else {
      dispatch(insertPhaseRequest({ selectedMachines, idProyecto, name }));
      // dispatch(
      //   insertMachineRequest({ selectedMachines, idProyecto, idFase: 1 })
      // );
    }
    setOpen(false);
  };

  return (
    <div>
      <form
        className="flex justify-center items-center flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-10 w-full text-center mt-5">
          {editPha ? "Editar fase" : "Nueva fase"}
        </h1>
        <div className="mb-10">
          <div className="flex justify-center items-center mb-5">
            <TextField
              sx={{ width: "15rem" }}
              type="text"
              label="Fase"
              autoComplete="off"
              defaultValue={phase?.fase || ""}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name", {
                required: true,
                validate: (value) => textFieldValidation(value, 20),
              })}
            />
          </div>
          {!editPha && (
            <Fragment>
              {_.isEmpty(selectedMachines) ? (
                <Typography
                  sx={{ textAlign: "center", mb: 2 }}
                  color="primary.main"
                >
                  No tienes maquinas disponibles
                </Typography>
              ) : (
                <div className="grid grid-cols-3 gap-2 mb-5 max-h-64 overflow-y-auto">
                  {_.map(selectedMachines, (item, index) => (
                    <Typography key={index} sx={{ textAlign: "end" }}>
                      {item}
                      <IconButton onClick={() => handleDeleteMachine(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </Typography>
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
                    Agregar maquina
                  </Button>
                </div>
              </div>
            </Fragment>
          )}
        </div>
        <div className="w-full flex justify-center">
          <Button
            type="submit"
            variant="contained"
            disabled={
              editPha ? false : _.isEmpty(selectedMachines) ? true : false
            }
          >
            {editPha ? "Actualizar" : "Agregar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PhaseForm;
