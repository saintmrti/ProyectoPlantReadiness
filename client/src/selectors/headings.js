import { createSelector } from "@reduxjs/toolkit";

export const getHeading = createSelector(
  ({ headings }, idHeading) => headings.list[idHeading],
  (headings) => {
    if (!headings) return {};
    return headings;
  }
);
