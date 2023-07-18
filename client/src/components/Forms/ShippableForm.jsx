import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Select, Input, Textarea } from "@rewind-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { insertShippableRequest } from "../../slices/shippable";

const ShippableForm = ({ setOpen, idExpectancy }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const lastShippable = useSelector((state) => state.shippable.lastShippable);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (shouldRedirect && lastShippable && lastShippable.id) {
      setShouldRedirect(false);
      navigate(`/avances/${lastShippable.id}`);
    }
  }, [lastShippable, navigate, shouldRedirect]);

  const onSubmit = (values) => {
    values.idExpectativa = idExpectancy;
    dispatch(insertShippableRequest(values));
    setOpen(false);
    reset();
    setShouldRedirect(true);
  };

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center flex-wrap bg-gray-100 shadow-md rounded-md p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-5 w-full text-center">Nuevo entregable</h1>
        <div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Entregable</label>
            <Input
              type="text"
              placeholder="Agregar entregable"
              autoComplete="off"
              {...register("nombre", { required: true })}
            />
          </div>
          {/* <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Expectativa</label>
            <Select
              {...register("expectativa", { required: true })}
              defaultValue=""
            >
              <option value="">Seleccione una expectativa</option>
              {_.map(data, (item) => (
                <option key={item.id} value={item.id}>
                  {item.expectativa}
                </option>
              ))}
            </Select>
          </div> */}
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Evidencia</label>
            <Input
              type="text"
              placeholder="Documento"
              autoComplete="off"
              {...register("evidencia", { required: true })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Prioridad</label>
            <Select
              defaultValue=""
              {...register("prioridad", { required: true })}
            >
              <option value="">Seleccione prioridad</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
            </Select>
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Ponderación</label>
            <Select
              defaultValue=""
              {...register("ponderacion", { required: true })}
            >
              <option value="">Seleccione una ponderacion</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Select>
          </div>
          <div className="flex justify-end w-full mb-3">
            <label className="px-4 py-2 w-40">Comentarios</label>
            <Textarea
              placeholder="Ingresar comentarios..."
              className="h-60"
              {...register("comentarios", { required: true })}
            ></Textarea>
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

export default ShippableForm;
