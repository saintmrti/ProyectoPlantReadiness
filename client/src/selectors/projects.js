import { createSelector } from "@reduxjs/toolkit";

export const getProject = createSelector(
  ({ projects }, idProyecto) => projects.list[idProyecto],
  (project) => {
    if (!project) return {};
    return project;
  }
);
