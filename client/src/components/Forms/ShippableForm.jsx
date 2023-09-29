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
import { textFieldValidation } from "./validated";
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
        <h1 className="text-3xl mb-5 w-full text-center">
          {editShi ? "Editar entregable" : "Nuevo entregable"}
        </h1>
        <div className="mb-10">
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Nombre</label>
            <TextField
              sx={{ width: "16rem" }}
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
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Evidencia</label>
            <TextField
              sx={{ width: "16rem" }}
              type="text"
              label="Documento"
              autoComplete="off"
              error={Boolean(errors.evidencia)}
              helperText={errors.evidencia?.message}
              {...register("evidencia", {
                required: true,
                validate: (value) => textFieldValidation(value, 60),
              })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Prioridad</label>
            <FormControl sx={{ width: "16rem" }}>
              <InputLabel id="prioridad">Seleccionar prioridad</InputLabel>
              <Select
                labelId="prioridad"
                id="select-priority"
                label="Seleccionar prioridad"
                autoComplete="off"
                defaultValue={shippable?.prioridad || ""}
                {...register("prioridad", { required: true })}
              >
                <MenuItem value="">Seleccionar prioridad</MenuItem>
                <MenuItem value="P1">P1</MenuItem>
                <MenuItem value="P2">P2</MenuItem>
                <MenuItem value="P3">P3</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Ponderación</label>
            <FormControl sx={{ width: "16rem" }}>
              <InputLabel id="ponderacion">Seleccionar ponderación</InputLabel>
              <Select
                labelId="ponderacion"
                id="select-ponderation"
                label="Seleccionar ponderación"
                autoComplete="off"
                defaultValue={shippable?.ponderacion || ""}
                {...register("ponderacion", { required: true })}
              >
                <MenuItem value="">Seleccionar ponderación</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </Select>
            </FormControl>
          </div> */}
          <div className="flex justify-end w-full">
            <label className="px-4">Comentarios</label>
            <TextField
              label="Ingresar comentarios..."
              multiline
              rows={8}
              className="w-64"
              autoComplete="off"
              error={Boolean(errors.comentarios)}
              helperText={errors.comentarios?.message}
              {...register("comentarios", {
                required: true,
                validate: (value) => textFieldValidation(value, 600),
              })}
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button variant="contained" type="submit">
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippableForm;
