import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { textFieldValidation } from "./validated";
import { FileUploader } from "../FileUploader";
import {
  insertChampionRequest,
  updateChampionRequest,
} from "../../slices/champions";
import { getChampion } from "../../selectors/champions";

export const ChampionsForm = ({ idProyecto, setOpen, editCham }) => {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [missingImage, setMissingImage] = useState(false);
  const [tooLargeImage, setTooLargeImage] = useState(false);
  const champion = useSelector((state) => getChampion(state, editCham));

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
      values.idProyecto = idProyecto;
      values.imagen = selectedFiles;
      editCham
        ? dispatch(updateChampionRequest({ ...values, id: editCham }))
        : dispatch(insertChampionRequest(values));
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
          {editCham ? "Editar Champion" : "Nuevo Champion"}
        </h1>
        <div className="flex justify-center items-center h-60">
          <div className="mr-5">
            <FileUploader
              setMissingImage={setMissingImage}
              setTooLargeImage={setTooLargeImage}
              championImg={champion?.imagen}
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
                defaultValue={champion?.nombre || ""}
                helperText={errors.nombre?.message}
                {...register("nombre", {
                  required: true,
                  validate: (value) => textFieldValidation(value, 50),
                })}
              />
            </div>
            <div className="flex justify-end items-center w-full mb-3">
              <TextField
                sx={{ width: "15rem" }}
                type="text"
                label="Rubro"
                autoComplete="off"
                error={Boolean(errors.rubro)}
                defaultValue={champion?.rubro || ""}
                helperText={errors.rubro?.message}
                {...register("rubro", {
                  required: true,
                  validate: (value) => textFieldValidation(value, 20),
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
