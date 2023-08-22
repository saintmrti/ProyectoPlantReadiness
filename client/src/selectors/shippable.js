import { createSelector } from "@reduxjs/toolkit";

export const getShippable = createSelector(
  ({ shippable }, idShippable) => shippable.data[idShippable],
  (shippable) => {
    if (!shippable) return {};
    return shippable;
  }
);
