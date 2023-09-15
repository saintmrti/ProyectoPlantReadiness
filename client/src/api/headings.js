import axios, { CancelToken } from "axios";

export const fetchHeadingsApi = {
  cancel: null,
  run: (idProyecto) =>
    axios
      .get("/api/rubros", {
        cancelToken: new CancelToken((c) => (fetchHeadingsApi.cancel = c)),
        params: { idProyecto },
      })
      .then(({ data }) => data),
};

export const insertHeadingsApi = {
  cancel: null,
  run: (heading) =>
    axios
      .post("/api/rubros", heading, {
        cancelToken: new CancelToken((c) => (insertHeadingsApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const updateHeadingsApi = {
  cancel: null,
  run: (heading) =>
    axios
      .put("/api/rubros", heading, {
        cancelToken: new CancelToken((c) => (updateHeadingsApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deleteHeadingsApi = {
  cancel: null,
  run: (idRubro) =>
    axios
      .delete("/api/rubros", {
        cancelToken: new CancelToken((c) => (deleteHeadingsApi.cancel = c)),
        params: { idRubro },
      })
      .then(({ data }) => data),
};
