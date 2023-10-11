import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const getUsers = createSelector(
  ({ users }) => users.list,
  (users) => {
    if (_.isEmpty(users)) return {};

    const dataUsers = users?.dataUsers;
    const dataAccess = users?.dataAccess;

    // const usersList = _.map(dataUsers, (user) => ({
    //   id: user.idUsuario,
    //   nombre: `${user.c_nombre} ${user.c_apellido_pat} ${user.c_apellido_mat}`,
    //   rol: user.n_pr === 1 ? "Champion Pilar" : "Champion Gerente",
    //   acceso: _.map(
    //     _.filter(dataAccess, { idUsuario: user.idUsuario }),
    //     (access) => ({
    //       id: access.idProyecto,
    //       nombre: access.c_nombre,
    //     })
    //   ),
    // }));

    const usersList = _.map(dataUsers, (user) => {
      const access = _.find(dataAccess, { idUsuario: user.idUsuario });
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
