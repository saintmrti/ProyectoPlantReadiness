import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const summaryUsers = (idProyecto) =>
  createSelector(
    ({ users }) => users.list,
    (users) => {
      if (_.isEmpty(users)) return {};

      const dataUsers = users?.dataUsers;
      const dataAccess = users?.dataAccess;

      const filteredAccess = _.filter(dataAccess, {
        idProyecto: parseInt(idProyecto),
      });
      const usersList = _.map(dataUsers, (user) => {
        const access = _.find(filteredAccess, { idUsuario: user.idUsuario });
        const hasAccess = access ? true : false;
        return {
          id: user.idUsuario,
          nombre: `${user.c_nombre} ${user.c_apellido_pat} ${user.c_apellido_mat}`,
          rol: user.n_pr === 1 ? "Champion Pilar" : "Champion Gerente",
          access: user.n_pr === 1 ? hasAccess : true,
          gerente: user.n_pr === 2 ? true : false,
        };
      });

      return usersList;
    }
  );

export const getUserAccessById = (idProyecto, userId) =>
  createSelector(summaryUsers(idProyecto), (usersList) => {
    const user = _.find(usersList, { id: userId });
    if (user) {
      if (user.gerente || user.access) {
        return true;
      }
    }
    return false;
  });
