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
import {
  textFieldValidation,
  dateFieldValidation,
  numberFieldValidation,
} from "./validated";

const MachinesForm = ({
  idEntregable,
  fases,
  isFetching,
  advanceState,
  idProyecto,
}) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [checkboxStates, setCheckboxStates] = useState({});

  const handleCheckboxChange = (machine, index, event) => {
    setCheckboxStates({
      ...checkboxStates,
      [machine.maquina]: event.target.checked,
    });

    if (event.target.checked) {
      const responsibleFieldName = `responsible_${index}`;
      const startDateFieldName = `startDate_${index}`;
      const endDateFieldName = `endDate_${index}`;
      const realDateFieldName = `realDate_${index}`;
      const advanceFieldName = `advance_${index}`;
      const commentsFieldName = `comments_${index}`;
      setValue(responsibleFieldName, advanceState.responsable);
      setValue(startDateFieldName, advanceState.fecha_inicio);
      setValue(endDateFieldName, advanceState.fecha_termino);
      setValue(realDateFieldName, advanceState.fecha_real);
      setValue(advanceFieldName, advanceState.avance);
      setValue(commentsFieldName, advanceState.comentarios);
    }
  };

  const validateDateField = (name, index) => {
    return checkboxStates[fases[index].maquina]
      ? register(name, {
          validate: (value) => dateFieldValidation(value),
        })
      : register(name, {
          required: false,
        });
  };

  const validateTextField = (name, index, maxLength) => {
    return checkboxStates[fases[index].maquina]
      ? register(name, {
          validate: (value) => textFieldValidation(value, maxLength),
        })
      : register(name, {
          required: false,
        });
  };

  const validateNumberField = (name, index) => {
    return checkboxStates[fases[index].maquina]
      ? register(name, {
          validate: (value) => numberFieldValidation(value),
        })
      : register(name, {
          required: false,
        });
  };

  const onSubmit = (values) => {
    const groupedValues = _.reduce(
      Object.keys(values),
      (result, key) => {
        const parts = key.split("_");
        const fieldName = parts[0];
        const index = parts[1];

        if (checkboxStates[fases[index].maquina]) {
          if (!result[index]) {
            result[index] = {};
          }

          const value = values[key] !== undefined ? values[key] : "";
          result[index][fieldName] = value;
          result[index]["idFase"] = fases[index].id;
          result[index]["idEntregable"] = idEntregable;
          result[index]["idProyecto"] = idProyecto;
        }

        return result;
      },
      {}
    );

    const filteredArray = _.values(groupedValues);

    dispatch(insertAdvanceRequest({ advance: filteredArray, idProyecto }));
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
        <Chip sx={{ width: "11rem" }} label="Fecha Inicio" color="primary" />
        <Chip sx={{ width: "11rem" }} label="Fecha Termino" color="primary" />
        <Chip sx={{ width: "11rem" }} label="Fecha Real" color="primary" />
        <Chip sx={{ width: "11rem" }} label="Avance" color="primary" />
        <Chip sx={{ width: "11rem" }} label="Comentarios" color="primary" />
      </Stack>
      {_.map(fases, (machine, index) => (
        <div
          className="flex justify-between items-center mb-2"
          key={machine.id}
        >
          <FormGroup
            sx={{ display: "flex", itemsAlign: "center", width: "11rem" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) =>
                    handleCheckboxChange(machine, index, event)
                  }
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
            error={Boolean(errors[`responsible_${index}`])}
            defaultValue={advanceState.responsable}
            helperText={errors[`responsible_${index}`]?.message}
            {...validateTextField(`responsible_${index}`, index, 30)}
          />
          <TextField
            sx={{ width: "11rem" }}
            type="date"
            disabled={!checkboxStates[machine.maquina]}
            error={Boolean(errors[`startDate_${index}`])}
            defaultValue={advanceState.fecha_inicio}
            helperText={errors[`startDate_${index}`]?.message}
            {...validateDateField(`startDate_${index}`, index)}
          />
          <TextField
            sx={{ width: "11rem" }}
            type="date"
            error={Boolean(errors[`endDate_${index}`])}
            defaultValue={advanceState.fecha_termino}
            disabled={!checkboxStates[machine.maquina]}
            helperText={errors[`endDate_${index}`]?.message}
            {...validateDateField(`endDate_${index}`, index)}
          />
          <TextField
            sx={{ width: "11rem" }}
            type="date"
            disabled={!checkboxStates[machine.maquina]}
            defaultValue={advanceState.fecha_real}
            {...register(`realDate_${index}`, { required: false })}
          />
          <TextField
            sx={{ width: "11rem" }}
            type="number"
            label="Avance"
            disabled={!checkboxStates[machine.maquina]}
            error={Boolean(errors[`advance_${index}`])}
            defaultValue={advanceState.avance}
            helperText={errors[`advance_${index}`]?.message}
            inputProps={{
              min: 0,
              max: 100,
            }}
            {...validateNumberField(`advance_${index}`, index)}
          />
          <TextField
            sx={{ width: "11rem" }}
            type="text"
            label="Comentarios"
            defaultValue={advanceState.comentarios}
            disabled={!checkboxStates[machine.maquina]}
            inputProps={{ maxLength: 120 }}
            {...register(`comments_${index}`, { required: false })}
          />
        </div>
      ))}
      <div className="flex justify-center mt-5">
        <Button
          type="submit"
          variant="contained"
          disabled={
            isFetching ||
            !Object.values(checkboxStates).some((checked) => checked)
          }
        >
          {isFetching ? "Cargando..." : "Agregar"}
        </Button>
      </div>
    </form>
  );
};

export default MachinesForm;
