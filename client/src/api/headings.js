import axios, { CancelToken } from "axios";

export const fetchHeadingsApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/rubros", {
        cancelToken: new CancelToken((c) => (fetchHeadingsApi.cancel = c)),
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
