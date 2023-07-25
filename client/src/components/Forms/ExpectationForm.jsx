import { useForm } from "react-hook-form";
import { Button, Input, Select } from "@rewind-ui/core";
import TextField from "@mui/material/TextField";
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
        className="flex justify-center items-center flex-wrap shadow-md rounded-md h-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center mt-5">
          Nueva expectativa
        </h1>
        <div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Expectativa</label>
            <TextField
              label="Expectativa"
              autoComplete="off"
              {...register("expectancy", { required: true })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Rubro</label>
            <div className="w-60">
              <Select defaultValue="" {...register("area", { required: true })}>
                <option value="">Seleccionar rubro</option>
                {_.map(data, (item) => (
                  <option key={item.id} value={item.id}>
                    {item.rubro}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mb-5">
          <Button color="red" shadow="md" shadowColor="red" type="submit">
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExpectationForm;
