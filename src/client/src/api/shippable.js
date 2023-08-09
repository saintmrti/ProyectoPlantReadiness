import axios, { CancelToken } from "axios";

export const insertShippableApi = {
  cancel: null,
  run: (ship) =>
    axios
      .post("/api/entregables", ship, {
        cancelToken: new CancelToken((c) => (insertShippableApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const fetchShippableApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/entregables", {
        cancelToken: new CancelToken((c) => (fetchShippableApi.cancel = c)),
      })
      .then(({ data }) => data),
};
