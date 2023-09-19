import axios, { CancelToken } from "axios";

export const fetchProjectsApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/proyectos", {
        cancelToken: new CancelToken((c) => (fetchProjectsApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const insertProjectApi = {
  cancel: null,
  run: (project) =>
    axios
      .post("/api/proyectos", project, {
        cancelToken: new CancelToken((c) => (insertProjectApi.cancel = c)),
      })
      .then(({ data }) => data),
};
