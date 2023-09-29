import axios, { CancelToken } from "axios";

export const fetchMachinesApi = {
  cancel: null,
  run: (idProyecto) =>
    axios
      .get("/api/maquinas", {
        cancelToken: new CancelToken((c) => (fetchMachinesApi.cancel = c)),
        params: { idProyecto },
      })
      .then(({ data }) => data),
};

export const insertMachineApi = {
  cancel: null,
  run: (mach) =>
    axios
      .post("/api/maquinas", mach, {
        cancelToken: new CancelToken((c) => (insertMachineApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deleteMachineApi = {
  cancel: null,
  run: (idMaquina) =>
    axios
      .delete("/api/maquinas", {
        cancelToken: new CancelToken((c) => (deleteMachineApi.cancel = c)),
        params: { idMaquina },
      })
      .then(({ data }) => data),
};
