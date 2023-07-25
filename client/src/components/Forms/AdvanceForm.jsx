import { useForm } from "react-hook-form";
import { Button, Select } from "@rewind-ui/core";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const AdvanceForm = ({ setOpen, fases, data }) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { idEntregable, idGrupo } = values;
    setOpen(false);
    reset();
    navigate(`/avances/${idEntregable}/${idGrupo}`);
  };

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap shadow-md rounded-md h-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-5 w-full text-center mt-5">
          Agregar avances
        </h1>
        <div>
          {/* <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Responsable</label>
            <Input
              type="text"
              placeholder="Nombre del responsable"
              autoComplete="off"
              {...register("responsable", { required: true })}
            />
          </div> */}
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Entregable</label>
            <div className="w-60">
              <Select
                {...register("idEntregable", { required: true })}
                defaultValue=""
              >
                <option value="">Seleccione un entregable</option>
                {_.map(data, (item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Fase</label>
            <div className="w-60">
              <Select
                {...register("idGrupo", { required: true })}
                defaultValue=""
              >
                <option value="">Seleccione una fase</option>
                {_.map(fases, (item) => (
                  <option key={item.id} value={item.idGrupo}>
                    {item.fase}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mb-5">
          <Button color="red" shadow="md" shadowColor="red" type="submit">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdvanceForm;
