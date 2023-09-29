import axios, { CancelToken } from "axios";

export const fetchAdvanceApi = {
  cancel: null,
  run: (idProyecto) =>
    axios
      .get("/api/avances", {
        cancelToken: new CancelToken((c) => (fetchAdvanceApi.cancel = c)),
        params: { idProyecto },
      })
      .then(({ data }) => data),
};

export const insertAdvanceApi = {
  cancel: null,
  run: (adv) =>
    axios
      .post("/api/avances", adv, {
        cancelToken: new CancelToken((c) => (insertAdvanceApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const updateAdvanceApi = {
  cancel: null,
  run: (adv) =>
    axios
      .put("/api/avances", adv, {
        cancelToken: new CancelToken((c) => (updateAdvanceApi.cancel = c)),
      })
      .then(({ data }) => data),
};
