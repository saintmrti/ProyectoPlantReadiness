import { useEffect, Fragment, useState } from "react";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { textFieldValidationV2 } from "./validated";
import { changeAdvance } from "../../slices/setAdvance";
import { getAdvance } from "../../selectors/advance";
import { getAccessDate } from "../../selectors/users";
import {
  updateAdvanceRequest,
  insertAdvanceRequest,
} from "../../slices/advance";

const AdvanceForm = ({
  setOpen,
  oneAdv,
  phases,
  idEntregable,
  editAdv,
  idProyecto,
  machines,
  tokenData,
  selectedMachine,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const advance = useSelector((state) => getAdvance(state, editAdv));
  const { data } = useSelector((state) => state.advance);
  const accessDate = useSelector(getAccessDate(idProyecto, tokenData.userId));
  const [checked, setChecked] = useState(false);
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
    const saveAdvance = {
      responsible: responsable,
      startDate: fecha_inicio,
      endDate: fecha_termino,
      realDate: fecha_real,
      advance: avance === "" ? "0" : avance,
      comments: comentarios,
      idAvance: editAdv,
      idUsuario: tokenData.userId,
      idEntregable,
      idProyecto,
    };
    if (editAdv) {
      const logAdvance = {
        ult_fecha_inicio:
          advance?.fecha_inicio !== fecha_inicio ? advance?.fecha_inicio : null,
        ult_fecha_termino:
          advance?.fecha_termino !== fecha_termino
            ? advance?.fecha_termino
            : null,
        ult_fecha_real:
          advance?.fecha_real !== fecha_real ? advance?.fecha_real : null,
      };
      dispatch(updateAdvanceRequest({ ...saveAdvance, ...logAdvance }));
    } else {
      if (oneAdv) {
        dispatch(
          insertAdvanceRequest({
            advance: [{ ...saveAdvance, idMaquina: selectedMachine }],
          })
        );
      } else {
        if (checked) {
          const filteredArray = _.map(machines, (item) => ({
            responsible: responsable,
            startDate: fecha_inicio,
            endDate: fecha_termino,
            realDate: fecha_real,
            advance: advance === "" ? "0" : advance,
            comments: comentarios,
            idMaquina: item.id,
            idProyecto,
            idEntregable,
          }));
          dispatch(
            insertAdvanceRequest({ advance: filteredArray, idProyecto })
          );
        } else {
          dispatch(changeAdvance(saveAdvance));
          navigate(
            `/proyectos/${idProyecto}/avances/${idEntregable}/${idFase}`
          );
        }
      }
    }
    setOpen(false);
    reset();
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const isData = _.some(data, { idEntregable: idEntregable });

  useEffect(() => {
    advance && reset(advance);
  }, [advance, reset, dispatch]);

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-5 w-full text-center">
          {editAdv ? "Editar avances" : "Agregar avances"}
        </h1>
        {console.log(idEntregable)}
        <div className="mb-10">
          {tokenData?.n_pr === 2 && (
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
          )}
          {!editAdv && !oneAdv && (
            <div className="flex justify-end items-center w-full mb-3">
              <label className="px-4">Fase</label>
              <FormControl sx={{ width: "160px", mr: 1 }}>
                <InputLabel id="fase">Fase</InputLabel>
                <Select
                  labelId="fase"
                  id="select-phase"
                  label="Fase"
                  error={Boolean(errors.idFase)}
                  autoComplete="off"
                  defaultValue=""
                  disabled={checked}
                  {...register(
                    "idFase",
                    checked ? { required: false } : { required: true }
                  )}
                >
                  {_.map(phases, (item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.fase}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    disabled={isData}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Todo"
              />
            </div>
          )}
          {(accessDate || tokenData?.n_pr === 2) && (
            <Fragment>
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
            <TextField
              sx={{ width: "16rem" }}
              type="number"
              label="Avance"
              defaultValue={0}
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
