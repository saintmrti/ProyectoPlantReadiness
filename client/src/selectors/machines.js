import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const summaryMachines = createSelector(
  ({ machines }) => machines.list,
  ({ phase }) => phase.list,

  (machines, phase) => {
    if (_.isEmpty(machines)) return {};

    const arrayMachines = _.map(machines, (machine) => ({
      id: machine.id,
      idFase: machine.idFase,
      idProyecto: machine.idProyecto,
      maquina: machine.maquina,
      fase: phase[machine.idFase]?.fase,
    }));

    const filteredMachines = _.filter(
      arrayMachines,
      (machine) => machine.fase !== undefined
    );

    const list = _.keyBy(filteredMachines, "id");
    return list;
  }
);
