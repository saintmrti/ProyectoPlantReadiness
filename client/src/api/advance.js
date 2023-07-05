import axios, { CancelToken } from "axios";

export const insertAdvanceApi = {
  cancel: null,
  run: (adv) =>
    axios
      .post("/api/avances", adv, {
        cancelToken: new CancelToken((c) => (insertAdvanceApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const fetchAdvanceApi = {
  cancel: null,
  run: (params) =>
    axios
      .get("/api/avances", {
        cancelToken: new CancelToken((c) => (fetchAdvanceApi.cancel = c)),
        params,
      })
      .then(({ data }) => data),
};
