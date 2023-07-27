import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import _ from "lodash";

import { insertExpectancyRequest } from "../../slices/expectancy";

const ExpectationForm = ({ setOpen, data }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {
    dispatch(insertExpectancyRequest(values));
    setOpen(false);
  };

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap h-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center mt-5">
          Nueva expectativa
        </h1>
        <div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Nombre</label>
            <TextField
              sx={{ width: "15rem" }}
              type="text"
              label="Expectativa"
              autoComplete="off"
              {...register("expectancy", { required: true })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Rubro</label>
            <FormControl sx={{ minWidth: "15rem" }}>
              <InputLabel id="demo">Seleccionar rubro</InputLabel>
              <Select
                labelId="demo"
                id="demo-simple-select"
                label="Seleccionar rubro"
                autoComplete="off"
                defaultValue=""
                {...register("area", { required: true })}
              >
                <MenuItem value="">
                  <em>Seleccionar rubro</em>
                </MenuItem>
                {_.map(data, (item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.rubro}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default ExpectationForm;
