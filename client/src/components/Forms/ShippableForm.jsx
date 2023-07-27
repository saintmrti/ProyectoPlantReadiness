import { useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import { insertShippableRequest } from "../../slices/shippable";

const ShippableForm = ({ setOpen, idExpectancy }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (values) => {
    values.idExpectativa = idExpectancy;
    dispatch(insertShippableRequest(values));
    setOpen(false);
    reset();
  };

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-5 w-full text-center">Nuevo entregable</h1>
        <div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Nombre</label>
            <TextField
              sx={{ width: "16rem" }}
              type="text"
              label="Entregable"
              autoComplete="off"
              {...register("nombre", { required: true })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Evidencia</label>
            <TextField
              sx={{ width: "16rem" }}
              type="text"
              label="Documento"
              autoComplete="off"
              {...register("evidencia", { required: true })}
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
                defaultValue=""
                {...register("prioridad", { required: true })}
              >
                <MenuItem value="">Seleccionar prioridad</MenuItem>
                <MenuItem value="P1">P1</MenuItem>
                <MenuItem value="P2">P2</MenuItem>
                <MenuItem value="P3">P3</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Ponderación</label>
            <FormControl sx={{ width: "16rem" }}>
              <InputLabel id="ponderacion">Seleccionar ponderación</InputLabel>
              <Select
                labelId="ponderacion"
                id="select-ponderation"
                label="Seleccionar ponderación"
                autoComplete="off"
                defaultValue=""
                {...register("ponderacion", { required: true })}
              >
                <MenuItem value="">Seleccionar ponderación</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-end w-full mb-3">
            <label className="px-4">Comentarios</label>
            <TextField
              label="Ingresar comentarios..."
              multiline
              rows={8}
              className="h-60 w-64"
              autoComplete="off"
              {...register("comentarios", { required: true })}
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
