import axios, { CancelToken } from "axios";

export const fetchLogsApi = {
  cancel: null,
  run: (idProyecto) =>
    axios
      .get("/api/logs", {
        cancelToken: new CancelToken((c) => (fetchLogsApi.cancel = c)),
        params: { idProyecto },
      })
      .then(({ data }) => data),
};
