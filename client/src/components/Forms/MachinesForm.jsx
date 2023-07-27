import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import _ from "lodash";

import { insertAdvanceRequest } from "../../slices/advance";

const MachinesForm = ({ idEntregable, fases, isFetching }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [checkboxStates, setCheckboxStates] = useState({});

  const handleCheckboxChange = (machine, event) => {
    setCheckboxStates({
      ...checkboxStates,
      [machine.maquina]: event.target.checked,
    });
  };

  const validateRegister = (name, index) => {
    return checkboxStates[fases[index].maquina]
      ? register(name, { required: true })
      : register(name, { required: false });
  };

  const onSubmit = (values) => {
    const groupedValues = _.reduce(
      Object.keys(values),
      (result, key) => {
        const parts = key.split("_");
        const fieldName = parts[0];
        const index = parts[1];

        if (!result[index]) {
          result[index] = {};
        }

        const value = values[key] || "";
        result[index][fieldName] = value;
        result[index]["idFase"] = fases[index].id;
        result[index]["idEntregable"] = idEntregable;

        return result;
      },
      {}
    );

    const filteredArray = _.values(groupedValues);

    dispatch(insertAdvanceRequest({ filteredArray }));
    reset();
  };

  return (
    <form
      className="flex flex-col justify-center pb-5 px-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl mb-5 text-center mt-5">{fases[0]?.fase}</h1>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
        direction="row"
        spacing={1}
      >
        <Chip sx={{ width: "11rem" }} label="Maquina" color="primary" />
        <Chip sx={{ width: "11rem" }} label="Responsable" color="primary" />
        <Chip sx={{ width: "11rem" }} label="Fecha de inicio" color="primary" />
        <Chip sx={{ width: "11rem" }} label="Fecha de fin" color="primary" />
        <Chip sx={{ width: "11rem" }} label="Fecha real" color="primary" />
        <Chip sx={{ width: "11rem" }} label="Avance" color="primary" />
        <Chip sx={{ width: "11rem" }} label="Comentarios" color="primary" />
      </Stack>
      {_.map(fases, (machine, index) => (
        <div className="flex justify-between items-center mb-2" key={index}>
          <FormGroup
            sx={{ display: "flex", itemsAlign: "center", width: "11rem" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => handleCheckboxChange(machine, event)}
                />
              }
              label={machine.maquina}
            />
          </FormGroup>
          <TextField
            sx={{ width: "11rem" }}
            type="text"
            label="Responsable"
            autoComplete="off"
            disabled={!checkboxStates[machine.maquina]}
            {...validateRegister(`responsible_${index}`, index)}
          />
          <TextField
            sx={{ width: "11rem" }}
            type="date"
            disabled={!checkboxStates[machine.maquina]}
            {...validateRegister(`startDate_${index}`, index)}
          />
          <TextField
            sx={{ width: "11rem" }}
            type="date"
            disabled={!checkboxStates[machine.maquina]}
            {...validateRegister(`endDate_${index}`, index)}
          />
          <TextField
            sx={{ width: "11rem" }}
            type="date"
            disabled={!checkboxStates[machine.maquina]}
            {...register(`realDate_${index}`, { required: false })}
          />
          <TextField
            sx={{ width: "11rem" }}
            type="number"
            label="Avance"
            disabled={!checkboxStates[machine.maquina]}
            {...validateRegister(`advance_${index}`, index)}
          />
          <TextField
            sx={{ width: "11rem" }}
            type="text"
            label="Comentarios"
            disabled={!checkboxStates[machine.maquina]}
            {...register(`comments_${index}`, { required: false })}
          />
        </div>
      ))}
      <div className="flex justify-center mt-5">
        <Button type="submit" variant="contained" disabled={isFetching}>
          {isFetching ? "Cargando..." : "Agregar"}
        </Button>
      </div>
    </form>
  );
};

export default MachinesForm;
