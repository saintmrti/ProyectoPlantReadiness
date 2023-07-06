import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment-timezone";

const formatearFecha = (fechaCompleta) =>
  moment.utc(fechaCompleta).format("DD-MM-YYYY");

export const groupedByIdPhase = createSelector(
  ({ advance }) => advance.data,

  ({ advance, shippable }) => {
    const summaryAdvanced = _.groupBy(advance, "idFase");

    _.forEach(summaryAdvanced, (value, key) => {
      summaryAdvanced[key] = _.map(value, (item) => ({
        id: item.id,
        idEntregable: item.idEntregable,
        idFase: item.idFase,
        idMaquina: item.idMaquina,
        maquina: item.maquina,
        responsable: item.responsable,
        fechaInicio: formatearFecha(item.fecha_inicio),
        fechaTermino: formatearFecha(item.fecha_termino),
        fechaReal: formatearFecha(item.fecha_real),
        avance: item.avance,
        comentarios: item.comentarios,
      }));
    });

    return {
      summaryAdvanced,
      shippable,
      advance,
    };
  }
);
