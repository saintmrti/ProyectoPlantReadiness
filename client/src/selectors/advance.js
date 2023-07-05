import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment-timezone";

const formatearFecha = (fechaCompleta) =>
  moment.utc(fechaCompleta).format("DD-MM-YYYY");

export const groupedByIdPhase = createSelector(
  ({ advance }) => advance.data,

  (advance) => {
    const list = _.groupBy(advance, "idFase");

    _.forEach(list, (value, key) => {
      list[key] = _.map(value, (item) => ({
        id: item.id,
        idEntregable: item.idEntregable,
        idFase: item.idFase,
        idMaquina: item.idMaquina,
        nombre: item.name,
        responsable: item.responsable,
        fechaInicio: formatearFecha(item.fecha_inicio),
        fechaTermino: formatearFecha(item.fecha_termino),
        fechaReal: formatearFecha(item.fecha_real),
        avance: item.avance,
        comentarios: item.comentarios,
      }));
    });
    return list;
  }
);
