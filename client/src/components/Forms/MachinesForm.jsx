import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Checkbox, Badge } from "@rewind-ui/core";
import _ from "lodash";

const machines = [
  { id: 1, name: "Extruder 4.5" },
  { id: 2, name: "Buncher 1800" },
  { id: 3, name: "B T 3+1" },
  { id: 4, name: "MSM86" },
  { id: 5, name: "Cableadora" },
  { id: 6, name: "Compound" },
  { id: 7, name: "P. ELEC." },
  { id: 8, name: "Med 2da" },
  { id: 9, name: "Coiler 2da" },
  { id: 10, name: "Cabelle" },
];

const MachinesForm = () => {
  const { register, handleSubmit } = useForm();
  const [checkboxStates, setCheckboxStates] = useState({});

  const handleCheckboxChange = (machine, event) => {
    setCheckboxStates({
      ...checkboxStates,
      [machine.name]: event.target.checked,
    });
  };

  const validateRegister = (name, index) => {
    return checkboxStates[machines[index].name]
      ? register(name, { required: true })
      : register(name, { required: false });
  };

  const onSubmit = (values) => {
    const groupedValues = Object.keys(values).reduce((result, key) => {
      const parts = key.split("_");
      const fieldName = parts[0];
      const index = parts[1];

      if (checkboxStates[machines[index].name]) {
        if (!result[index]) {
          result[index] = {};
        }

        result[index][fieldName] = values[key];
        result[index]["idMaquina"] = machines[index].id;
      }

      return result;
    }, []);

    const filteredArray = Object.values(groupedValues).filter(Boolean);

    console.log(filteredArray);
  };

  return (
    <div className="w-5/6">
      <form
        className="flex flex-col justify-center w-full bg-gray-100 shadow-md rounded-md p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-5 text-center">Fase 1</h1>
        <div className="flex justify-center items-center mb-2 w-full">
          <div className="w-48 px-4"></div>
          <div className="w-44 text-center">
            <Badge color="blue" shadowColor="black" className="px-4">
              Responsable
            </Badge>
          </div>
          <div className="w-44 text-center">
            <Badge color="blue" shadowColor="black" className="px-4">
              Fecha de inicio
            </Badge>
          </div>
          <div className="w-44 text-center">
            <Badge color="blue" shadowColor="black" className="px-4">
              Fecha de termino
            </Badge>
          </div>
          <div className="w-44 text-center">
            <Badge color="blue" shadowColor="black" className="px-4">
              Fecha real
            </Badge>
          </div>
          <div className="w-44 text-center">
            <Badge color="blue" shadowColor="black" className="px-4">
              Avance
            </Badge>
          </div>
        </div>
        {_.map(machines, (machine, index) => (
          <div className="flex justify-center items-center" key={index}>
            <Checkbox
              label=""
              onChange={(event) => handleCheckboxChange(machine, event)}
            />
            <label className="px-4 py-2 w-40">{machine.name}</label>
            <Input
              type="text"
              placeholder="Responsable"
              className="m-2 w-40"
              autoComplete="off"
              disabled={!checkboxStates[machine.name]}
              {...validateRegister(`responsible_${index}`, index)}
            />
            <Input
              type="date"
              placeholder="Fecha de inicio"
              className="m-2 w-40"
              disabled={!checkboxStates[machine.name]}
              {...validateRegister(`datestart_${index}`, index)}
            />
            <Input
              type="date"
              placeholder="Fecha de termino"
              className="m-2 w-40"
              disabled={!checkboxStates[machine.name]}
              {...validateRegister(`dateend_${index}`, index)}
            />
            <Input
              type="date"
              placeholder="Fecha real"
              className="m-2 w-40"
              disabled={!checkboxStates[machine.name]}
              {...validateRegister(`datereal_${index}`, index)}
            />
            <Input
              type="number"
              placeholder="Avance"
              className="m-2 w-40"
              disabled={!checkboxStates[machine.name]}
              {...validateRegister(`advance_${index}`, index)}
            />
          </div>
        ))}
        <div className="flex justify-center mt-5">
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

export default MachinesForm;
