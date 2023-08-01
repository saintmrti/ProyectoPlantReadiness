import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment-timezone";

export const getSummaryShippable = createSelector(
  ({ expectancy }) => expectancy.data,
  ({ shippable }) => shippable.data,

  (expectancy, shippable) => {
    if (_.isEmpty(expectancy)) return {};

    let security = 0;
    let quality = 0;
    let rh = 0;
    let production = 0;
    let maintenance = 0;

    _.forEach(shippable, (value) => {
      const objFinded = _.find(expectancy, (o) => o.id === value.idExpectativa);
      switch (objFinded.rubro) {
        case 1:
          security += 1;
          break;
        case 2:
          quality += 1;
          break;
        case 3:
          rh += 1;
          break;
        case 4:
          production += 1;
          break;
        case "Mantenimiento":
          maintenance += 1;
          break;
        default:
          break;
      }
    });

    let sumHeadings = {
      security,
      quality,
      rh,
      production,
      maintenance,
      total: security + quality + rh + production + maintenance,
    };

    return sumHeadings;
  }
);

export const getShippableByMonth = createSelector(
  ({ advance }) => advance.data,

  (advance) => {
    if (_.isEmpty(advance)) return {};

    const currentYear = moment().year();

    const filteredDateReal = _.filter(advance, (o) => {
      return (
        o.fecha_real !== null && moment(o.fecha_real).year() === currentYear
      );
    });

    const filteredDatePlan = _.filter(advance, (o) => {
      return (
        o.fecha_termino !== null &&
        moment(o.fecha_termino).year() === currentYear
      );
    });

    const groupedByMonthReal = _.groupBy(filteredDateReal, (value) =>
      moment.utc(value.fecha_real).startOf("month").format("YYYY-MM")
    );

    const groupedByMonthPlan = _.groupBy(filteredDatePlan, (value) =>
      moment.utc(value.fecha_termino).startOf("month").format("YYYY-MM")
    );

    const dataByMonthReal = _.map(groupedByMonthReal, (value, key) => {
      return [moment(key).valueOf(), value.length];
    });

    const dataByMonthPlan = _.map(groupedByMonthPlan, (value, key) => {
      return [moment(key).valueOf(), value.length];
    });

    const seriesPerMonth = [
      {
        name: "Plan",
        data: dataByMonthPlan,
      },
      {
        name: "Real",
        data: dataByMonthReal,
      },
    ];

    return seriesPerMonth;
  }
);

export const getShippableByYear = createSelector(
  ({ advance }) => advance.data,

  (advance) => {
    if (_.isEmpty(advance)) return {};

    const filteredDateReal = _.filter(advance, (o) => o.fecha_real !== null);

    const filteredDatePlan = _.filter(advance, (o) => o.fecha_termino !== null);

    const groupedByYearReal = _.groupBy(filteredDateReal, (value) =>
      moment.utc(value.fecha_real).startOf("year").format("YYYY")
    );

    const groupedByYearPlan = _.groupBy(filteredDatePlan, (value) =>
      moment.utc(value.fecha_termino).startOf("year").format("YYYY")
    );

    const dataByYearReal = _.map(groupedByYearReal, (value, key) => {
      return [moment(key).valueOf(), value.length];
    });

    const dataByYearPlan = _.map(groupedByYearPlan, (value, key) => {
      return [moment(key).valueOf(), value.length];
    });

    const seriesPerYear = [
      {
        name: "Plan",
        data: dataByYearPlan,
      },
      {
        name: "Real",
        data: dataByYearReal,
      },
    ];

    return seriesPerYear;
  }
);
