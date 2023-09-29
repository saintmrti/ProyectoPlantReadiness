import { createSelector } from "@reduxjs/toolkit";

export const getChampion = createSelector(
  ({ champions }, idChampion) => champions.list[idChampion],
  (champions) => {
    if (!champions) return {};
    return champions;
  }
);
