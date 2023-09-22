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

export const updateProjectApi = {
  cancel: null,
  run: (project) =>
    axios
      .put("/api/proyectos", project, {
        cancelToken: new CancelToken((c) => (updateProjectApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deleteProjectApi = {
  cancel: null,
  run: (idProyecto) =>
    axios
      .delete("/api/proyectos", {
        cancelToken: new CancelToken((c) => (deleteProjectApi.cancel = c)),
        params: { idProyecto },
      })
      .then(({ data }) => data),
};
