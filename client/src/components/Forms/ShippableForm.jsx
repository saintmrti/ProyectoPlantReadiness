import { useForm } from "react-hook-form";
import { Button, Select, Input, Textarea } from "@rewind-ui/core";
import { useDispatch } from "react-redux";

import { insertShippableRequest } from "../../slices/shippable";

const ShippableForm = ({ setOpen, idExpectancy }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (values) => {
    values.idExpectativa = idExpectancy;
    dispatch(insertShippableRequest(values));
    setOpen(false);
    reset();
  };

  return (
    <div className="max-w-lg mt-10">
      <form
        className="flex justify-center flex-wrap shadow-md rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-5 w-full text-center">Nuevo entregable</h1>
        <div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Entregable</label>
            <div className="w-64">
              <Input
                type="text"
                placeholder="Agregar entregable"
                autoComplete="off"
                {...register("nombre", { required: true })}
              />
            </div>
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Evidencia</label>
            <div className="w-64">
              <Input
                type="text"
                placeholder="Documento"
                autoComplete="off"
                {...register("evidencia", { required: true })}
              />
            </div>
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Prioridad</label>
            <div className="w-64">
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
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Ponderación</label>
            <div className="w-64">
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
          </div>
          <div className="flex justify-end w-full mb-3">
            <label className="px-4">Comentarios</label>
            <Textarea
              placeholder="Ingresar comentarios..."
              className="h-60 w-64"
              {...register("comentarios", { required: true })}
            />
          </div>
        </div>
        <div className="w-full flex justify-center mb-10 mt-5">
          <Button color="red" shadow="md" shadowColor="red" type="submit">
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippableForm;
