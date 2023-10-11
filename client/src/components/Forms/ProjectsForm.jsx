import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import { textFieldValidation } from "./validated";
import {
  insertProjectRequest,
  updateProjectRequest,
} from "../../slices/projects";
import { getProject } from "../../selectors/projects";

export const ProjectsForm = ({ setOpen, editProject }) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => getProject(state, editProject));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    editProject
      ? dispatch(updateProjectRequest({ ...values, id: editProject }))
      : dispatch(insertProjectRequest(values));
    setOpen(false);
    reset();
  };

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap h-60"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center">
          {editProject ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h1>
        <div className="flex justify-center items-center w-full mb-3">
          <TextField
            sx={{ width: "15rem" }}
            type="text"
            label="Nombre"
            autoComplete="off"
            error={Boolean(errors.nombre)}
            defaultValue={project?.nombre || ""}
            helperText={errors.nombre?.message}
            {...register("nombre", {
              required: true,
              validate: (value) => textFieldValidation(value, 50),
            })}
          />
        </div>
        {!editProject && (
          <div className="flex justify-center items-center w-full mb-3">
            <FormControl sx={{ width: "15rem" }}>
              <InputLabel id="fase">Plantilla</InputLabel>
              <Select
                label="Plantilla"
                autoComplete="off"
                {...register("idPlantilla", { required: true })}
              >
                <MenuItem value={1}>Planta</MenuItem>
                <MenuItem value={2}>Serie de maquinas</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        <div className="w-full flex justify-center">
          <Button variant="contained" type="submit">
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};
