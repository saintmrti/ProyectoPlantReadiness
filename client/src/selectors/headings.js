import { createSelector } from "@reduxjs/toolkit";

export const summaryHeadings = createSelector(
  ({ headings }) => headings.list,
  (headings) => {
    if (!headings) return {};
    const headingsArray = Object.values(headings);
    return headingsArray;
  }
);

export const getHeading = createSelector(
  ({ headings }, idHeading) => headings.list[idHeading],
  (headings) => {
    if (!headings) return {};
    return headings;
  }
);
