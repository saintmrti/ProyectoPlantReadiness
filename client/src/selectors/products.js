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

export const summaryProducts = createSelector(
  ({ products }) => products.data,
  (products) => {
    if (!products) return {};

    const filteredByMts = _.filter(products, { disHerramental: false });

    const filteredByHerramental = _.filter(products, { disHerramental: true });

    const productsMts = _.groupBy(filteredByMts, "idMaquina");

    const productsHerramental = _.groupBy(filteredByHerramental, "idMaquina");
    return {
      productsMts,
      productsHerramental,
    };
  }
);
