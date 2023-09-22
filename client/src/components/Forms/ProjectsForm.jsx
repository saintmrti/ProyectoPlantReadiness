import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { textFieldValidation } from "./validated";
import { FileUploader } from "../FileUploader";
import {
  insertProjectRequest,
  updateProjectRequest,
} from "../../slices/projects";
import { getProject } from "../../selectors/projects";

export const ProjectsForm = ({ setOpen, editProject }) => {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [missingImage, setMissingImage] = useState(false);
  const [tooLargeImage, setTooLargeImage] = useState(false);
  const project = useSelector((state) => getProject(state, editProject));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    if (selectedFiles === null) {
      setMissingImage(true);
    } else {
      values.icono = selectedFiles;
      editProject
        ? dispatch(updateProjectRequest({ ...values, id: editProject }))
        : dispatch(insertProjectRequest(values));
      setOpen(false);
      reset();
    }
  };

  const handleUpload = (files) => {
    setSelectedFiles(files);
  };

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap h-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center">
          {editProject ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h1>
        <div className="flex justify-center items-center h-60">
          <div className="mr-5">
            <FileUploader
              setMissingImage={setMissingImage}
              setTooLargeImage={setTooLargeImage}
              championImg={project?.icono}
              onUpload={handleUpload}
            />
            {missingImage ? (
              <span className="text-red-500">La imagen es requerida</span>
            ) : tooLargeImage ? (
              <span className="text-red-500">
                La imagen no puede pesar mas de 100kb
              </span>
            ) : null}
          </div>
          <div>
            <div className="flex justify-end items-center w-full mb-3">
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
                  validate: (value) => textFieldValidation(value, 25),
                })}
              />
            </div>
            <div className="flex justify-end items-center w-full mb-3">
              <TextField
                sx={{ width: "15rem" }}
                type="number"
                label="id"
                autoComplete="off"
                error={Boolean(errors.idProyecto)}
                defaultValue={project?.idProyecto || ""}
                helperText={errors.idProyecto?.message}
                {...register("idProyecto", {
                  required: true,
                })}
              />
            </div>
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
