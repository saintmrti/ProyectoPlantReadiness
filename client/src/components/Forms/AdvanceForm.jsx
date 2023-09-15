import { useEffect } from "react";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  textFieldValidation,
  dateFieldValidation,
  numberFieldValidation,
} from "./validated";
import { changeAdvance } from "../../slices/setAdvance";
import { getAdvance } from "../../selectors/advance";
import { updateAdvanceRequest } from "../../slices/advance";

const AdvanceForm = ({ setOpen, fases, idEntregable, editAdv, idProyecto }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const advance = useSelector((state) => getAdvance(state, editAdv));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    const {
      responsable,
      idGrupo,
      fecha_inicio,
      fecha_termino,
      fecha_real,
      avance,
      comentarios,
    } = values;
    setOpen(false);
    reset();
    const saveAdvance = {
      responsable,
      fecha_inicio,
      fecha_termino,
      fecha_real,
      avance,
      comentarios,
      idAvance: editAdv,
    };

    if (editAdv) {
      dispatch(updateAdvanceRequest(saveAdvance));
    } else {
      dispatch(changeAdvance(saveAdvance));
      navigate(`/proyectos/${idProyecto}/avances/${idEntregable}/${idGrupo}`);
    }
  };

  useEffect(() => {
    advance && reset(advance);
  }, [advance, reset]);

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-5 w-full text-center">
          {editAdv ? "Editar avances" : "Agregar avances"}
        </h1>
        <div className="mb-10">
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Nombre</label>
            <TextField
              sx={{ width: "16rem" }}
              type="text"
              label="Responsable"
              autoComplete="off"
              error={Boolean(errors.responsable)}
              helperText={errors.responsable?.message}
              {...register("responsable", {
                required: true,
                validate: (value) => textFieldValidation(value, 30),
              })}
            />
          </div>
          {!editAdv && (
            <div className="flex justify-end items-center w-full mb-3">
              <label className="px-4">Fase</label>
              <FormControl sx={{ width: "16rem" }}>
                <InputLabel id="fase">Seleccionar fase</InputLabel>
                <Select
                  labelId="fase"
                  id="select-phase"
                  label="Seleccionar fase"
                  autoComplete="off"
                  defaultValue=""
                  {...register("idGrupo", { required: true })}
                >
                  <MenuItem value="">
                    <em>Seleccionar fase</em>
                  </MenuItem>
                  {_.map(fases, (item) => (
                    <MenuItem key={item.id} value={item.idGrupo}>
                      {item.fase}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Fecha Inicio</label>
            <TextField
              sx={{ width: "16rem" }}
              type="date"
              error={Boolean(errors.fecha_inicio)}
              helperText={errors.fecha_inicio?.message}
              {...register("fecha_inicio", {
                required: true,
                validate: (value) => dateFieldValidation(value),
              })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Fecha Termino</label>
            <TextField
              sx={{ width: "16rem" }}
              type="date"
              error={Boolean(errors.fecha_termino)}
              helperText={errors.fecha_termino?.message}
              {...register("fecha_termino", {
                required: true,
                validate: (value) => dateFieldValidation(value),
              })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Fecha Real</label>
            <TextField
              sx={{ width: "16rem" }}
              type="date"
              {...register("fecha_real", { required: false })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Avance</label>
            <TextField
              sx={{ width: "16rem" }}
              type="number"
              label="Avance"
              inputProps={{
                min: 0,
                max: 100,
              }}
              {...register("avance", {
                required: true,
                validate: (value) => numberFieldValidation(value),
              })}
            />
          </div>
          <div className="flex justify-end w-full">
            <label className="px-4">Comentarios</label>
            <TextField
              label="Ingresar comentarios..."
              multiline
              rows={3}
              className="w-64"
              autoComplete="off"
              inputProps={{ maxLength: 120 }}
              {...register("comentarios", { required: false })}
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

export default AdvanceForm;
