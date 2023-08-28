import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment-timezone";

export const getSummaryKpis = createSelector(
  ({ kpis }) => kpis.data,

  (kpis) => {
    if (_.isEmpty(kpis)) return {};

    const parseShippable = JSON.parse(kpis[0]?.entregables_Total);
    const parseHeadings = JSON.parse(kpis[0]?.cumplimiento_Rubro);
    const parseEnergizer = JSON.parse(kpis[0]?.entregables_Energizador);
    const parseAdvance = JSON.parse(kpis[0]?.entregables_Avance);
    const parseShippableYear = JSON.parse(kpis[0]?.plan_EntregablesAnio);
    const parseShippableMonth = JSON.parse(kpis[0]?.plan_EntregablesMes);

    const sortedEnergizer = _.orderBy(parseEnergizer, "totales", "desc");
    const energizers = _.map(sortedEnergizer, "energizador");
    const energizerTotal = _.map(sortedEnergizer, "totales");
    const orderedAdvance = _.orderBy(parseAdvance, (item) => {
      const avance = item.avance;
      const match = avance.match(/(\d+)%/);
      if (match) {
        return -parseInt(match[1]);
      }
      return -1;
    });
    const advanceRate = _.map(orderedAdvance, "avance");
    const advanceTotal = _.map(orderedAdvance, "totales");
    const groupedByPlanYear = _.map(parseShippableYear, (value) => {
      return [moment(`${value.año}-01-01`).valueOf(), value.plan];
    });
    const groupedByRealYear = _.map(parseShippableYear, (value) => {
      return [moment(`${value.año}-01-01`).valueOf(), value.real];
    });
    const groupedByPlanMonth = _.map(parseShippableMonth, (value) => {
      return [
        moment(`${moment().year()}-${value.mes}-01`).valueOf(),
        value.plan,
      ];
    });
    const groupedByRealMonth = _.map(parseShippableMonth, (value) => {
      return [
        moment(`${moment().year()}-${value.mes}-01`).valueOf(),
        value.real,
      ];
    });

    const shippable_energizer = {
      categories: energizers,
      series: energizerTotal,
    };
    const shippable_advance = {
      categories: advanceRate,
      series: advanceTotal,
    };

    const shippable_year = [
      {
        name: "Plan",
        data: groupedByPlanYear,
      },
      {
        name: "Real",
        data: groupedByRealYear,
      },
    ];

    const shippable_month = [
      {
        name: "Plan",
        data: groupedByPlanMonth,
      },
      {
        name: "Real",
        data: groupedByRealMonth,
      },
    ];
    const shippable_total = _.keyBy(parseShippable, "Id");
    const compliance_headings = _.keyBy(parseHeadings, "Id");
    const compliance_total = JSON.parse(kpis[0]?.cumplimiento_Total);
    const compliance_YTD = JSON.parse(kpis[0]?.cumplimiento_YTD);

    const data = {
      shippable_total,
      compliance_total,
      compliance_YTD,
      compliance_headings,
      shippable_energizer,
      shippable_advance,
      shippable_year,
      shippable_month,
    };

    return data;
  }
);
