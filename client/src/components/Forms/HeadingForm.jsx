import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";

import { headingsInsertRequest } from "../../slices/headings";
import { textFieldValidation } from "./validated";

const HeadingForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    dispatch(headingsInsertRequest(values));
    setOpen(false);
  };

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap h-60"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center mt-5">Nuevo Rubro</h1>
        <div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Nombre</label>
            <TextField
              sx={{ width: "15rem" }}
              type="text"
              label="Rubro"
              autoComplete="off"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name", {
                required: true,
                validate: (value) => textFieldValidation(value, 25),
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

export default HeadingForm;
