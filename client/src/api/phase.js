import axios, { CancelToken } from "axios";

export const fetchPhaseApi = {
  cancel: null,
  run: (idProyecto) =>
    axios
      .get("/api/fases", {
        cancelToken: new CancelToken((c) => (fetchPhaseApi.cancel = c)),
        params: { idProyecto },
      })
      .then(({ data }) => data),
};

export const insertPhaseApi = {
  cancel: null,
  run: (pha) =>
    axios
      .post("/api/fases", pha, {
        cancelToken: new CancelToken((c) => (insertPhaseApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const updatePhaseApi = {
  cancel: null,
  run: (pha) =>
    axios
      .put("/api/fases", pha, {
        cancelToken: new CancelToken((c) => (updatePhaseApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deletePhaseApi = {
  cancel: null,
  run: (idFase) =>
    axios
      .delete("/api/fases", {
        cancelToken: new CancelToken((c) => (deletePhaseApi.cancel = c)),
        params: { idFase },
      })
      .then(({ data }) => data),
};
