import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@rewind-ui/core";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { insertExpectancyRequest } from "../../slices/expectancy";
import { headingsRequest } from "../../slices/headings";

const ExpectationForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { list } = useSelector((state) => state.headings);

  const onSubmit = (values) => {
    dispatch(insertExpectancyRequest(values));
  };

  useEffect(() => {
    dispatch(headingsRequest());
  }, [dispatch]);
  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center flex-wrap bg-gray-100 shadow-md rounded-md p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-2 w-full text-center">Nueva expectativa</h1>
        <div>
          <div className="flex justify-end items-center w-full">
            <label className="px-4 py-2">Expectativa</label>
            <input
              type="text"
              placeholder="Agregar expectativa"
              className="px-4 py-2 rounded-md m-2 w-56"
              autoComplete="off"
              {...register("expectancy", { required: true })}
            />
          </div>
          <div className="flex justify-end items-center w-full">
            <label className="px-4 py-2">Rubro</label>
            <select
              className="px-4 py-2 rounded-md m-2 w-56"
              defaultValue=""
              {...register("area", { required: true })}
            >
              <option value="">Seleccionar rubro</option>
              {_.map(list, (item) => (
                <option key={item.id} value={item.id}>
                  {item.rubro}
                </option>
              ))}
            </select>
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
