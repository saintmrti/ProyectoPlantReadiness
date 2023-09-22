import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";

import { updatePhaseRequest } from "../../slices/phase";
import { textFieldValidation } from "./validated";
import { getPhase } from "../../selectors/phase";

const UpdatePhaseForm = ({ setOpen, editPha, idProyecto }) => {
  const dispatch = useDispatch();
  const phase = useSelector((state) => getPhase(state, editPha));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    dispatch(
      updatePhaseRequest({ ...values, idGrupo: phase.idGrupo, idProyecto })
    );
    setOpen(false);
  };

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap h-60"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center mt-5">Editar Fase</h1>
        <div className="flex justify-center items-center w-full mb-3">
          <label className="px-4">Nombre</label>
          <TextField
            sx={{ width: "15rem" }}
            type="text"
            label="Fase"
            autoComplete="off"
            error={Boolean(errors.fase)}
            defaultValue={phase?.fase || ""}
            helperText={errors.fase?.message}
            {...register("fase", {
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

export default UpdatePhaseForm;
