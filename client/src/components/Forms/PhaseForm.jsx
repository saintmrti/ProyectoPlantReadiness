import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Checkbox } from "@rewind-ui/core";
import _ from "lodash";

import { insertPhaseRequest } from "../../slices/phase";
import { insertMachineRequest } from "../../slices/machines";

const PhaseForm = ({ setOpen, data, idGrupo }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [machine, setMachine] = useState("");
  const { isFetchingInsert } = useSelector((state) => state.machines);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedMachines((prevSelectedMachines) => [
        ...prevSelectedMachines,
        { id },
      ]);
    } else {
      setSelectedMachines((prevSelectedMachines) =>
        prevSelectedMachines.filter((machine) => machine.id !== id)
      );
    }
  };

  const handleAddMachine = () => {
    dispatch(insertMachineRequest({ machine }));
    setMachine("");
  };

  const onSubmit = (values) => {
    const { name } = values;
    const newPhases = _.map(selectedMachines, (machine) => ({
      idMaquina: machine.id,
      idGrupo: idGrupo,
      fase: name,
    }));
    dispatch(insertPhaseRequest({ newPhases }));
    setOpen(false);
  };

  return (
    <div>
      <form
        className="flex justify-center flex-wrap bg-gray-100 shadow-md rounded-md p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center">Nueva fase</h1>
        <div className="mb-5">
          <div className="flex justify-end items-center mb-5">
            <label className="px-4 py-2 w-36">Nombre</label>
            <Input
              type="text"
              placeholder="Agregar fase"
              autoComplete="off"
              {...register("name", { required: true })}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-5">
            {_.map(data, (item) => (
              <div key={item.id}>
                <Checkbox
                  label={item.maquina}
                  id={item.id}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-evenly">
            <div>
              <Input
                type="text"
                placeholder="Agregar maquina"
                autoComplete="off"
                onChange={(e) => setMachine(e.target.value)}
                value={machine}
              />
            </div>
            <div>
              <Button
                onClick={handleAddMachine}
                disabled={machine === "" ? true : false}
                loading={isFetchingInsert}
              >
                Agregar maquina
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button type="submit" disabled={selectedMachines.length === 0}>
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PhaseForm;
