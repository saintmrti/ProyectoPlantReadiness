import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const groupedByIdField = createSelector(
  ({ expectancy }) => expectancy.data,
  (data) => {
    const list = _.groupBy(data, "rubro");
    return list;
  }
);
