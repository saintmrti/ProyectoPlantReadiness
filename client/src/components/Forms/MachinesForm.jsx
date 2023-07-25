import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Input, Checkbox, Badge, Textarea } from "@rewind-ui/core";
import _ from "lodash";

import { insertAdvanceRequest } from "../../slices/advance";

const MachinesForm = ({ idEntregable, fases, isFetching }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [checkboxStates, setCheckboxStates] = useState({});

  const handleCheckboxChange = (machine, event) => {
    setCheckboxStates({
      ...checkboxStates,
      [machine.maquina]: event.target.checked,
    });
  };

  const validateRegister = (name, index) => {
    return checkboxStates[fases[index].maquina]
      ? register(name, { required: true })
      : register(name, { required: false });
  };

  const onSubmit = (values) => {
    const groupedValues = _.reduce(
      Object.keys(values),
      (result, key) => {
        const parts = key.split("_");
        const fieldName = parts[0];
        const index = parts[1];

        if (!result[index]) {
          result[index] = {};
        }

        const value = values[key] || "";
        result[index][fieldName] = value;
        result[index]["idFase"] = fases[index].id;
        result[index]["idEntregable"] = idEntregable;

        return result;
      },
      {}
    );

    const filteredArray = _.values(groupedValues);

    dispatch(insertAdvanceRequest({ filteredArray }));
    reset();
  };

  return (
    <div className="h-screen">
      <form
        className="flex flex-col justify-center px-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-5 text-center mt-5">{fases[0]?.fase}</h1>
        <div className="flex justify-between items-center w-full mb-5">
          <div className="w-40 text-center">
            <Badge
              tone="glossy"
              color="red"
              shadow="md"
              shadowColor="red"
              className="px-7 py-4"
            >
              Maquina
            </Badge>
          </div>
          <div className="w-40 text-center">
            <Badge
              tone="glossy"
              color="red"
              shadow="md"
              shadowColor="red"
              className="px-7 py-4"
            >
              Responsable
            </Badge>
          </div>
          <div className="w-40 text-center">
            <Badge
              tone="glossy"
              color="red"
              shadow="md"
              shadowColor="red"
              className="px-7 py-4"
            >
              Fecha Inicio
            </Badge>
          </div>
          <div className="w-40 text-center">
            <Badge
              tone="glossy"
              color="red"
              shadow="md"
              shadowColor="red"
              className="px-7 py-4"
            >
              Fecha Termino
            </Badge>
          </div>
          <div className="w-40 text-center">
            <Badge
              tone="glossy"
              color="red"
              shadow="md"
              shadowColor="red"
              className="px-7 py-4"
            >
              Fecha Real
            </Badge>
          </div>
          <div className="w-40 text-center">
            <Badge
              tone="glossy"
              color="red"
              shadow="md"
              shadowColor="red"
              className="px-7 py-4"
            >
              Avance
            </Badge>
          </div>
          <div className="w-60 text-center">
            <Badge
              tone="glossy"
              color="red"
              shadow="md"
              shadowColor="red"
              className="px-7 py-4"
            >
              Comentarios
            </Badge>
          </div>
        </div>
        {_.map(fases, (machine, index) => (
          <div className="flex justify-between items-center mb-4" key={index}>
            <div className="flex w-40">
              <Checkbox
                label={machine.maquina}
                onChange={(event) => handleCheckboxChange(machine, event)}
              />
            </div>
            <Input
              type="text"
              placeholder="Responsable"
              className="w-40"
              autoComplete="off"
              disabled={!checkboxStates[machine.maquina]}
              {...validateRegister(`responsible_${index}`, index)}
            />
            <Input
              type="date"
              placeholder="Fecha de inicio"
              className="w-40"
              disabled={!checkboxStates[machine.maquina]}
              {...validateRegister(`startDate_${index}`, index)}
            />
            <Input
              type="date"
              placeholder="Fecha de termino"
              className="w-40"
              disabled={!checkboxStates[machine.maquina]}
              {...validateRegister(`endDate_${index}`, index)}
            />
            <Input
              type="date"
              placeholder="Fecha real"
              className="w-40"
              disabled={!checkboxStates[machine.maquina]}
              {...register(`realDate_${index}`, { required: false })}
            />
            <Input
              type="number"
              placeholder="Avance"
              className="w-40"
              disabled={!checkboxStates[machine.maquina]}
              {...validateRegister(`advance_${index}`, index)}
            />
            <Textarea
              placeholder="Comentarios"
              className="w-60 h-10"
              disabled={!checkboxStates[machine.maquina]}
              {...register(`comments_${index}`, { required: false })}
            />
          </div>
        ))}
        <div className="flex justify-center">
          <Button
            color="red"
            shadowColor="red"
            shadow="md"
            type="submit"
            disabled={isFetching}
            loading={isFetching}
          >
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MachinesForm;
