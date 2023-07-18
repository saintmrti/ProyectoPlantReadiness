import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment-timezone";

const formatearFecha = (fechaCompleta) =>
  fechaCompleta === null ? null : moment.utc(fechaCompleta).format("DD-MMM");

export const summaryAdvanced = createSelector(
  ({ advance }) => advance.data,

  (data) => {
    const groupedData = _.groupBy(data, "idExpectativa");

    const groupedByIdShippable = _.mapValues(groupedData, (items) => {
      items = _.map(items, (item) => ({
        id: item.id,
        idEntregable: item.idEntregable,
        idFase: item.idFase,
        idMaquina: item.idMaquina,
        idGrupo: item.idGrupo,
        responsable: item.responsable,
        fecha_inicio: formatearFecha(item.fecha_inicio),
        fecha_termino: formatearFecha(item.fecha_termino),
        fecha_real: formatearFecha(item.fecha_real),
        avance: item.avance,
        comentarios: item.comentarios,
      }));
      return _.groupBy(items, "idEntregable");
    });

    return groupedByIdShippable;
  }
);
