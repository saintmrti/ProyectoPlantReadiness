import axios, { CancelToken } from "axios";

export const fetchShippableApi = {
  cancel: null,
  run: (idProyecto) =>
    axios
      .get("/api/entregables", {
        cancelToken: new CancelToken((c) => (fetchShippableApi.cancel = c)),
        params: { idProyecto },
      })
      .then(({ data }) => data),
};

export const insertShippableApi = {
  cancel: null,
  run: (ship) =>
    axios
      .post("/api/entregables", ship, {
        cancelToken: new CancelToken((c) => (insertShippableApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const updateShippableApi = {
  cancel: null,
  run: (ship) =>
    axios
      .put("/api/entregables", ship, {
        cancelToken: new CancelToken((c) => (updateShippableApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deleteShippableApi = {
  cancel: null,
  run: (idEntregable) =>
    axios
      .delete(`/api/entregables`, {
        cancelToken: new CancelToken((c) => (deleteShippableApi.cancel = c)),
        params: { idEntregable },
      })
      .then(({ data }) => data),
};
