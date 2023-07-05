import { useForm } from "react-hook-form";
import { Button, Select, Input, Textarea } from "@rewind-ui/core";
import _ from "lodash";
import { useDispatch } from "react-redux";

import { insertAdvanceRequest } from "../../slices/advance";

// const machines = [
//   { id: 1, name: "Extruder 4.5" },
//   { id: 2, name: "Buncher 1800" },
//   { id: 3, name: "B T 3+1" },
//   { id: 4, name: "MSM86" },
//   { id: 5, name: "Cableadora" },
//   { id: 6, name: "Compound" },
//   { id: 7, name: "P. ELEC." },
//   { id: 8, name: "Med 2da" },
//   { id: 9, name: "Coiler 2da" },
//   { id: 10, name: "Cabelle" },
// ];
// eslint-disable-next-line react/prop-types
const MachineForm = ({ setOpen, data, idEntregable }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (values) => {
    values.idEntregable = idEntregable;
    values.idFase = "1";
    dispatch(insertAdvanceRequest(values));
    console.log(values);
    setOpen(false);
    reset();
  };

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center flex-wrap bg-gray-100 shadow-md rounded-md p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-5 w-full text-center">Nueva maquina</h1>
        <div>
          {/* <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Entregable</label>
            <Input
              type="text"
              placeholder="Agregar entregable"
              autoComplete="off"
              {...register("nombre", { required: true })}
            />
          </div> */}
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Responsable</label>
            <Input
              type="text"
              placeholder="Nombre del responsable"
              autoComplete="off"
              {...register("responsable", { required: true })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Maquina</label>
            <Select
              {...register("idMaquina", { required: true })}
              defaultValue=""
            >
              <option value="">Seleccione una maquina</option>
              {_.map(data, (item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Fecha inicio</label>
            <Input
              type="date"
              placeholder="Seleccione una fecha"
              {...register("fecha_inicio", { required: true })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Fecha term</label>
            <Input
              type="date"
              placeholder="Seleccione una fecha"
              {...register("fecha_termino", { required: true })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Fecha real</label>
            <Input
              type="date"
              placeholder="Seleccione una fecha"
              {...register("fecha_real", { required: false })}
            />
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Avance</label>
            <Input
              type="number"
              placeholder="Avance en %"
              min={0}
              max={100}
              {...register("avance", { required: true })}
            />
          </div>
          <div className="flex justify-end w-full mb-3">
            <label className="px-4 py-2 w-40">Comentarios</label>
            <Textarea
              placeholder="Ingresar comentarios..."
              className="h-40"
              {...register("comentarios", { required: false })}
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

export default MachineForm;
