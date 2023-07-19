import axios, { CancelToken } from "axios";

export const insertPhaseApi = {
  cancel: null,
  run: (pha) =>
    axios
      .post("/api/fases", pha, {
        cancelToken: new CancelToken((c) => (insertPhaseApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const fetchPhaseApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/fases", {
        cancelToken: new CancelToken((c) => (fetchPhaseApi.cancel = c)),
      })
      .then(({ data }) => data),
};
