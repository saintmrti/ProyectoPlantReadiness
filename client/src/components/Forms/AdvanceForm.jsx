import { useEffect, Fragment } from "react";
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
import { textFieldValidationV2 } from "./validated";
import { changeAdvance } from "../../slices/setAdvance";
import { getAdvance } from "../../selectors/advance";
import { updateAdvanceRequest } from "../../slices/advance";

const AdvanceForm = ({
  setOpen,
  phases,
  idEntregable,
  editAdv,
  idProyecto,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const advance = useSelector((state) => getAdvance(state, editAdv));
  const { tokenData } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    const {
      responsable,
      idFase,
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
      navigate(`/proyectos/${idProyecto}/avances/${idEntregable}/${idFase}`);
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
          {tokenData?.n_pr === 2 && (
            <Fragment>
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
                    required: false,
                    validate: (value) => textFieldValidationV2(value, 30),
                  })}
                />
              </div>
              {!editAdv && (
                <div className="flex justify-end items-center w-full mb-3">
                  <label className="px-4">Fase</label>
                  <FormControl sx={{ width: "16rem" }}>
                    <InputLabel id="fase">Fase</InputLabel>
                    <Select
                      labelId="fase"
                      id="select-phase"
                      label="Fase"
                      error={Boolean(errors.idFase)}
                      helperText={errors.idFase?.message}
                      autoComplete="off"
                      defaultValue=""
                      {...register("idFase", { required: true })}
                    >
                      {_.map(phases, (item) => (
                        <MenuItem key={item.id} value={item.id}>
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
                    required: false,
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
                    required: false,
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
            </Fragment>
          )}
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
                required: false,
              })}
            />
          </div>
          <div className="flex justify-end w-full">
            <label className="px-4">Comentarios</label>
            <TextField
              label="Comentarios"
              multiline
              rows={3}
              error={Boolean(errors.comentarios)}
              helperText={errors.comentarios?.message}
              className="w-64"
              autoComplete="off"
              {...register("comentarios", {
                required: false,
                validate: (value) => textFieldValidationV2(value, 255),
              })}
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button variant="contained" type="submit">
            {editAdv ? "Actualizar" : "Agregar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdvanceForm;
