import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const summaryProjects = createSelector(
  ({ projects }) => projects.list,
  ({ auth }) => auth.tokenData,
  ({ users }) => users.list,
  (projects, auth, users) => {
    if (_.isEmpty(projects)) return {};
    const userAccess = users?.dataAccess;
    if (auth && auth.n_pr === 2) return projects;

    const projectsWithAccess = _.filter(
      userAccess,
      (user) => user.idUsuario === auth.userId
    );

    const projectsWithAccessIds = _.map(projectsWithAccess, (item) => {
      return projects[item.idProyecto];
    });

    return projectsWithAccessIds;
  }
);

export const getProject = createSelector(
  ({ projects }, idProyecto) => projects.list[idProyecto],
  (project) => {
    if (!project) return {};
    return project;
  }
);
