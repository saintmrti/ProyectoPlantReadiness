import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import _ from "lodash";

import {
  insertExpectancyRequest,
  updateExpectancyRequest,
} from "../../slices/expectancy";
import { textFieldValidation } from "./validated";
import { getExpectancy } from "../../selectors/expectancy";

const ExpectationForm = ({ setOpen, data, editExp, idProyecto }) => {
  const dispatch = useDispatch();
  const expectancy = useSelector((state) => getExpectancy(state, editExp));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    editExp
      ? dispatch(updateExpectancyRequest(values))
      : dispatch(insertExpectancyRequest({ ...values, idProyecto }));
    setOpen(false);
  };

  useEffect(() => {
    expectancy && reset(expectancy);
  }, [expectancy, reset]);

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap h-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center mt-5">
          {editExp ? "Editar expectativa" : "Nueva expectativa"}
        </h1>
        <div className="flex flex-col justify-end items-center w-full mb-3">
          <TextField
            sx={{ width: "15rem", mb: 2 }}
            type="text"
            label="Expectativa"
            autoComplete="off"
            defaultValue={expectancy?.expectativa || ""}
            error={Boolean(errors.expectancy)}
            helperText={errors.expectancy?.message}
            {...register("expectancy", {
              required: true,
              validate: (value) => textFieldValidation(value, 60),
            })}
          />
          {!editExp && (
            <FormControl sx={{ minWidth: "15rem" }}>
              <InputLabel id="demo">Rubro</InputLabel>
              <Select
                labelId="demo"
                id="demo-simple-select"
                label="Rubro"
                error={Boolean(errors.area)}
                autoComplete="off"
                {...register("area", { required: true })}
              >
                {_.map(data, (item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.rubro}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
        <div className="w-full flex justify-center">
          <Button variant="contained" type="submit">
            {editExp ? "Actualizar" : "Agregar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExpectationForm;
