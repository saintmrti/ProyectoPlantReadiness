// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "@rewind-ui/core";
import { useDispatch } from "react-redux";
import _ from "lodash";

import { insertExpectancyRequest, fetchExpectancyRequest } from "../../slices/expectancy";
// import { headingsRequest } from "../../slices/headings";

// eslint-disable-next-line react/prop-types
const ExpectationForm = ({ setOpen, data }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {
    dispatch(insertExpectancyRequest(values));
    dispatch(fetchExpectancyRequest());
    setOpen(false);
  };

  // useEffect(() => {
  //   dispatch(headingsRequest());
  // }, [dispatch]);
  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center flex-wrap bg-gray-100 shadow-md rounded-md p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center">Nueva expectativa</h1>
        <div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-36">Expectativa</label>
            <Input
              type="text"
              placeholder="Agregar expectativa"
              autoComplete="off"
              {...register("expectancy", { required: true })}
            />
          </div>
          <div className="flex justify-end items-center w-full">
            <label className="px-4 py-2 w-36">Rubro</label>
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
        <div className="w-full flex justify-center">
          <Button
            className="rounded-md bg-blue-600 px-2 text-white my-2"
            type="submit"
          >
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExpectationForm;
