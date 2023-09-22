import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";

import {
  insertHeadingsRequest,
  updateHeadingsRequest,
} from "../../slices/headings";
import { textFieldValidation } from "./validated";
import { getHeading } from "../../selectors/headings";

const HeadingForm = ({ setOpen, editHead, idProyecto }) => {
  const dispatch = useDispatch();
  const heading = useSelector((state) => getHeading(state, editHead));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    editHead
      ? dispatch(updateHeadingsRequest({ ...values, id: editHead }))
      : dispatch(insertHeadingsRequest({ ...values, idProyecto }));
    setOpen(false);
  };

  useEffect(() => {
    heading && reset(heading);
  }, [heading, reset]);

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap h-60"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center mt-5">
          {editHead ? "Editar Rubro" : "Nuevo Rubro"}
        </h1>
        <div className="flex justify-end items-center w-full mb-3">
          <label className="px-4">Nombre</label>
          <TextField
            sx={{ width: "15rem" }}
            type="text"
            label="Rubro"
            autoComplete="off"
            error={Boolean(errors.name)}
            defaultValue={heading?.rubro || ""}
            helperText={errors.name?.message}
            {...register("name", {
              required: true,
              validate: (value) => textFieldValidation(value, 25),
            })}
          />
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

export default HeadingForm;
