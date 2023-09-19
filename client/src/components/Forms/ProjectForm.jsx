import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { insertProjectRequest } from "../../slices/projects";
import { textFieldValidation } from "./validated";
// import { getHeading } from "../../selectors/headings";

const ProjectForm = ({ isFetching }) => {
  const dispatch = useDispatch();
  // const heading = useSelector((state) => getHeading(state, editHead));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    dispatch(insertProjectRequest(values));
    reset();
  };

  // useEffect(() => {
  //   heading && reset(heading);
  // }, [heading, reset]);

  return (
    <form
      className="flex justify-center items-center flex-wrap h-80"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="flex justify-end items-center w-full mb-10">
          <TextField
            sx={{ width: "15rem" }}
            type="text"
            label="Nombre"
            autoComplete="off"
            error={Boolean(errors.nombre)}
            helperText={errors.nombre?.message}
            {...register("nombre", {
              required: true,
              validate: (value) => textFieldValidation(value, 50),
            })}
          />
        </div>
        <div className="w-full flex justify-center">
          <Button variant="contained" type="submit" disabled={isFetching}>
            {isFetching ? "Cargando..." : "Agregar"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
