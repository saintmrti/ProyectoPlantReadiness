import axios, { CancelToken } from "axios";

export const fetchKpisApi = {
  cancel: null,
  run: (kpis) =>
    axios
      .post("/api/kpis", kpis, {
        cancelToken: new CancelToken((c) => (fetchKpisApi.cancel = c)),
      })
      .then(({ data }) => data),
};
