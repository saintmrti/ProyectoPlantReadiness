import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const groupedByIdExpectancy = createSelector(
  ({ expectancy }) => expectancy.data,
  ({ shippable }) => shippable.data,

  (expectancy, shippable) => {
    if (_.isEmpty(expectancy)) return {};

    const list = _.groupBy(expectancy, "rubro");

    _.forEach(list, (value, key) => {
      list[key] = _.map(value, (item) => ({
        ...item,
        shippables: _.filter(
          shippable,
          (entregable) => entregable.idExpectativa === item.id
        ),
      }));
    });

    return list;
  }
);
