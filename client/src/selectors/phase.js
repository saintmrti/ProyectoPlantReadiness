import { createSelector } from "@reduxjs/toolkit";
// import _ from "lodash";

export const getPhase = createSelector(
  ({ phase }, idFase) => phase.list[idFase],
  (phase) => {
    if (!phase) return {};
    return phase;
  }
);
