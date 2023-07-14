import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const groupedByIdField = createSelector(
  ({ expectancy }) => expectancy.data,
  ({ shippable }) => shippable.data,

  (expectancy, shippable) => {
    const list = _.groupBy(expectancy, "rubro");

    _.forEach(list, (value, key) => {
      list[key] = _.map(value, (item) => ({
        ...item,
        shippables: _.filter(
          shippable,
          (entregable) => entregable.expectativa === item.id
        ),
      }));
    });

    return list;
  }
);
