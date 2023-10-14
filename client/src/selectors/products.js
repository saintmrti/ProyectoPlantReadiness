import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const getMachine = createSelector(
  ({ products }, idMaquina) =>
    _.filter(products.data, { idMaquina: idMaquina }),
  (products) => {
    if (!products) return {};
    return products;
  }
);
