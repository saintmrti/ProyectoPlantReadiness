import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

import {
  insertShippableRequest,
  updateShippableRequest,
} from "../../slices/shippable";
import { textFieldValidation, textFieldValidationV2 } from "./validated";
import { getShippable } from "../../selectors/shippable";

const ShippableForm = ({ setOpen, idExpectancy, editShi, idProyecto }) => {
  const dispatch = useDispatch();
  const shippable = useSelector((state) => getShippable(state, editShi));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    values.idExpectativa = idExpectancy;
    editShi
      ? dispatch(updateShippableRequest(values))
      : dispatch(insertShippableRequest({ ...values, idProyecto }));
    setOpen(false);
    reset();
  };

  useEffect(() => {
    shippable && reset(shippable);
  }, [shippable, reset]);

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-10 w-full text-center">
          {editShi ? "Editar entregable" : "Nuevo entregable"}
        </h1>
        <div className="flex flex-col justify-end items-center w-full mb-10">
          <TextField
            sx={{ width: "16rem", mb: 2 }}
            type="text"
            label="Entregable"
            autoComplete="off"
            error={Boolean(errors.nombre)}
            helperText={errors.nombre?.message}
            {...register("nombre", {
              required: true,
              validate: (value) => textFieldValidation(value, 200),
            })}
          />
          <TextField
            sx={{ width: "16rem", mb: 2 }}
            type="text"
            label="Evidencia"
            autoComplete="off"
            error={Boolean(errors.evidencia)}
            helperText={errors.evidencia?.message}
            {...register("evidencia", {
              required: true,
              validate: (value) => textFieldValidation(value, 60),
            })}
          />
          <TextField
            sx={{ width: "16rem", mb: 2 }}
            type="text"
            label="Quien valida"
            autoComplete="off"
            error={Boolean(errors.qn_valida)}
            helperText={errors.qn_valida?.message}
            {...register("qn_valida", {
              required: false,
              validate: (value) => textFieldValidationV2(value, 30),
            })}
          />
          <FormControl sx={{ width: "16rem", mb: 2 }}>
            <InputLabel id="prioridad">Prioridad</InputLabel>
            <Select
              labelId="prioridad"
              id="select-priority"
              label="Prioridad"
              autoComplete="off"
              error={Boolean(errors.prioridad)}
              defaultValue={shippable?.prioridad || ""}
              {...register("prioridad", { required: true })}
            >
              <MenuItem value="P1">P1</MenuItem>
              <MenuItem value="P2">P2</MenuItem>
              <MenuItem value="P3">P3</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Ingresar comentarios..."
            multiline
            rows={8}
            className="w-64"
            autoComplete="off"
            error={Boolean(errors.comentarios)}
            helperText={errors.comentarios?.message}
            {...register("comentarios", {
              required: false,
              validate: (value) => textFieldValidationV2(value, 600),
            })}
          />
        </div>
        <div className="w-full flex justify-center">
          <Button variant="contained" type="submit">
            {editShi ? "Actualizar" : "Agregar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippableForm;
