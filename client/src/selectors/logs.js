import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment-timezone";

export const getSummaryLogs = createSelector(
  ({ logs }) => logs.data,

  (logs) => {
    if (_.isEmpty(logs)) return {};
    const data = _.map(logs, (item) => ({
      id: item.idReg,
      idAvance: item.idAvance,
      idUsuario: item.idUsuario,
      usuario: `${item.c_nombre} ${item.c_apellido_pat} ${item.c_apellido_mat}`,
      entregable: item.entregable,
      maquina: item.maquina,
      fase: item.fase,
      cont_FechaInicio: item.cont_FechaInicio,
      cont_FechaFin: item.cont_FechaFin,
      cont_FechaReal: item.cont_FechaReal,
      ult_FechaInicio: item.ult_FechaInicio
        ? moment.utc(item.ult_FechaInicio).format("DD/MM/YYYY")
        : null,
      ult_FechaFin: item.ult_FechaFin
        ? moment.utc(item.ult_FechaFin).format("DD/MM/YYYY")
        : null,
      ult_FechaReal: item.ult_FechaReal
        ? moment.utc(item.ult_FechaReal).format("DD/MM/YYYY")
        : null,
    }));

    return data;
  }
);
